import React, { useState } from 'react';
import nutrientData from '../NutrientValue.json';

const Upload = ({ onAnalysisComplete }) => {
  const [genomeData, setGenomeData] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setGenomeData(null);
      setFileName('');
      return;
    }

    setFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      setGenomeData(content);
    };
    reader.readAsText(file);
  };

  const performAnalysis = () => {
    if (!genomeData || !nutrientData) return;

    const userSnps = {};
    const lines = genomeData.split('\n');
    lines.forEach(line => {
      if (line.startsWith('#') || line.trim() === '') return;
      const [rsid, , , genotype] = line.split('\t');
      if (rsid && genotype) {
        userSnps[rsid.trim()] = genotype.trim();
      }
    });

    const flipAllele = (allele) => {
        switch (allele) {
            case 'A': return 'T';
            case 'T': return 'A';
            case 'C': return 'G';
            case 'G': return 'C';
            default: return allele;
        }
    };

    const normalizeGenotype = (genotype) => {
        if(!genotype) return "";
        return genotype.split('').sort().join('');
    };

    const findMatch = (userGenotype, snpGenotypes) => {
        const normalizedUserGeno = normalizeGenotype(userGenotype);

        // Direct match
        for (const geno in snpGenotypes) {
            if (normalizeGenotype(geno) === normalizedUserGeno) {
                return geno;
            }
        }

        // Flipped match
        const flippedUserGeno = normalizeGenotype(
            userGenotype.split('').map(flipAllele).join('')
        );
        for (const geno in snpGenotypes) {
            if (normalizeGenotype(geno) === flippedUserGeno) {
                return geno;
            }
        }

        return null;
    };

    const results = {};
    const processCategory = (category, categoryName) => {
        if (!category) return;
        category.forEach(item => {
            const snpId = item.snp;
            if (userSnps[snpId]) {
                const userGenotype = userSnps[snpId];
                const matchedGeno = findMatch(userGenotype, item.genotypes);

                if (matchedGeno) {
                    const meaning = item.genotypes[matchedGeno];
                    const key = item[categoryName.slice(0, -1)] || item.nutrient || item.trait;
                    if (!results[key]) {
                        results[key] = [];
                    }
                    results[key].push({
                        snp: snpId,
                        genotype: userGenotype,
                        meaning: meaning
                    });
                }
            }
        });
    };

    processCategory(nutrientData.Nutrients, 'Nutrients');
    processCategory(nutrientData.Conditions, 'Conditions');
    processCategory(nutrientData.Traits, 'Traits');

    if (onAnalysisComplete) {
      onAnalysisComplete(results);
    }
  };

  return (
    <div className="card shadow-sm border-primary mb-4">
      <div className="card-body">
        <h5 className="card-title text-primary">Upload DNA & Analyze</h5>
        <p className="card-text">Upload your genome file (e.g., from 23andMe) to see your personalized traits.</p>
        <div className="input-group">
          <input
            type="file"
            className="form-control"
            accept=".txt"
            onChange={handleFileChange}
            id="dna-upload"
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={performAnalysis}
            disabled={!genomeData}
          >
            Analyze
          </button>
        </div>
        {fileName && <p className="mt-2 text-muted">Selected file: {fileName}</p>}
      </div>
    </div>
  );
};

export default Upload;