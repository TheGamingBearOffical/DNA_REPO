import React from 'react';
import { Smartphone, Wifi, Lock, RefreshCw, Monitor, Zap, Power, Shield, Sliders } from 'react-feather';
import './PhoneAsWebcamInstructions.css';

const PhoneAsWebcamInstructions = () => {
  return (
    <div className="instructions-container">
      <h6 className="instructions-title">How to Use Your Phone as a Webcam</h6>
      
      <div className="os-section">
        <div className="os-header">
          <Monitor size={20} />
          <span>For macOS & iPhone (Continuity Camera)</span>
        </div>
        <p className="instructions-text">
          macOS can automatically use your iPhone's camera. If it's not showing up, check these steps:
        </p>
        <ul className="instruction-steps">
          <li><Wifi size={18} className="step-icon" /> Your Mac and iPhone must have Wi-Fi and Bluetooth turned on.</li>
          <li><Smartphone size={18} className="step-icon" /> Both devices must be signed into the same Apple ID.</li>
          <li><Lock size={18} className="step-icon" /> Your iPhone's screen must be locked and held in a stable, landscape position.</li>
          <li><RefreshCw size={18} className="step-icon" /> After checking, click the "Refresh Cameras" button above. Your iPhone should appear in the list.</li>
        </ul>

        <div className="troubleshooting-section">
          <p className="troubleshooting-title">Still not working? Try these common fixes:</p>
          <ul className="instruction-steps">
            <li><Zap size={18} className="step-icon" /> <strong>Connect with Cable:</strong> Connect your iPhone to your Mac with a USB cable once. Tap "Trust" on your iPhone if prompted. This can establish a trusted link for wireless connections.</li>
            <li><Power size={18} className="step-icon" /> <strong>Restart Devices:</strong> A simple reboot of both your iPhone and your Mac often resolves hidden connectivity issues.</li>
            <li><Shield size={18} className="step-icon" /> <strong>Check VPN & Firewall:</strong> Temporarily disable any VPN. On your Mac, go to System Settings › Network › Firewall and ensure "ContinuityCaptureAgent" isn't blocked.</li>
            <li><Sliders size={18} className="step-icon" /> <strong>Disable AirPlay Receiver:</strong> On your Mac, go to System Settings › General › AirDrop & Handoff and turn off "AirPlay Receiver".</li>
          </ul>
        </div>

        <p className="instructions-footnote">
          This feature is built into macOS Ventura/iOS 16 and newer. No extra apps needed.
        </p>
      </div>

      <div className="os-section">
        <div className="os-header">
          <Smartphone size={20} />
          <span>For Windows & Android</span>
        </div>
        <p className="instructions-text">
          You can get the same high-quality result by using a third-party app.
        </p>
        <ol className="instruction-steps-ol">
            <li><strong>Install an App:</strong> Download an app like Camo or EpocCam on your phone and computer.</li>
            <li><strong>Connect:</strong> Open the app on both devices and connect them via Wi-Fi (on the same network) or a USB cable.</li>
            <li><strong>Select Camera:</strong> The app will create a virtual camera. Click "Refresh Cameras" and select it from the dropdown list.</li>
        </ol>
      </div>
    </div>
  );
};

export default PhoneAsWebcamInstructions; 