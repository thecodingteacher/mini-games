import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Server, Laptop, AlertTriangle, Activity, Clock, Wifi, Shield, Globe, Settings } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';

const DDoSSimulation = () => {
  // ... Previous state variables remain the same ...
  const [isRunning, setIsRunning] = useState(false);
  const [attackLevel, setAttackLevel] = useState(0);
  const [serverHealth, setServerHealth] = useState(100);
  const [packets, setPackets] = useState([]);
  const [responseTime, setResponseTime] = useState(100);
  const [bandwidth, setBandwidth] = useState(100);
  const [attackType, setAttackType] = useState('syn');
  const [attackSources, setAttackSources] = useState(1);
  const [metrics, setMetrics] = useState([]);

  // New mitigation controls
  const [mitigationSettings, setMitigationSettings] = useState({
    wafEnabled: false,
    rateLimiting: false,
    botProtection: false,
    ddosProtection: false,
    ssl: false,
    cacheEverything: false,
    browserIntegrityCheck: false,
    challengePage: false
  });

  const [selectedTab, setSelectedTab] = useState('simulation');
  const [showTutorial, setShowTutorial] = useState(true);

  // Calculate protection level based on enabled settings
  const calculateProtectionLevel = () => {
    const enabledSettings = Object.values(mitigationSettings).filter(Boolean).length;
    return (enabledSettings / Object.keys(mitigationSettings).length) * 100;
  };

  // Calculate impact with new mitigation settings
  const calculateImpact = (baseImpact) => {
    let impact = baseImpact;
    if (mitigationSettings.wafEnabled) impact *= 0.8;
    if (mitigationSettings.rateLimiting) impact *= 0.7;
    if (mitigationSettings.botProtection) impact *= 0.75;
    if (mitigationSettings.ddosProtection) impact *= 0.6;
    if (mitigationSettings.ssl) impact *= 0.9;
    if (mitigationSettings.cacheEverything) impact *= 0.85;
    if (mitigationSettings.browserIntegrityCheck) impact *= 0.8;
    if (mitigationSettings.challengePage) impact *= 0.7;
    return impact;
  };

  // Tutorial content
  const tutorialSteps = [
    {
      title: "Understanding DDoS Attacks",
      content: "A DDoS attack attempts to overwhelm your server with traffic from multiple sources. This simulation demonstrates various attack types and mitigation strategies."
    },
    {
      title: "Mitigation Settings",
      content: "Enable different protection measures to see their impact. Each setting helps reduce the attack's effectiveness in different ways."
    },
    {
      title: "Monitoring Metrics",
      content: "Watch how server health, response time, and bandwidth are affected by both attacks and your mitigation strategies."
    }
  ];

  const MitigationControl = ({ label, enabled, onChange, description }) => (
    <div className="flex items-center justify-between p-2 border rounded">
      <div className="space-y-1">
        <div className="font-medium">{label}</div>
        <div className="text-sm text-gray-500">{description}</div>
      </div>
      <Switch
        checked={enabled}
        onCheckedChange={onChange}
      />
    </div>
  );

  return (
    <Card className="w-full max-w-4xl">
      <CardHeader>
        <CardTitle>DDoS Attack Simulation & Mitigation Training</CardTitle>
        <CardDescription>Learn about DDoS attacks and how to protect against them</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="simulation">Simulation</TabsTrigger>
            <TabsTrigger value="mitigation">Mitigation Controls</TabsTrigger>
            <TabsTrigger value="tutorial">Tutorial</TabsTrigger>
          </TabsList>

          <TabsContent value="simulation">
            {/* Existing simulation content */}
            {/* ... Previous simulation content ... */}
          </TabsContent>

          <TabsContent value="mitigation">
            <div className="space-y-4">
              <Alert>
                <AlertTitle>Protection Level</AlertTitle>
                <AlertDescription>
                  Current protection: {calculateProtectionLevel().toFixed(1)}%
                </AlertDescription>
              </Alert>

              <div className="grid gap-4">
                <MitigationControl
                  label="WAF (Web Application Firewall)"
                  description="Filter and block malicious HTTP/HTTPS traffic"
                  enabled={mitigationSettings.wafEnabled}
                  onChange={(checked) => setMitigationSettings(prev => ({...prev, wafEnabled: checked}))}
                />

                <MitigationControl
                  label="Rate Limiting"
                  description="Limit requests per IP to prevent abuse"
                  enabled={mitigationSettings.rateLimiting}
                  onChange={(checked) => setMitigationSettings(prev => ({...prev, rateLimiting: checked}))}
                />

                <MitigationControl
                  label="Bot Protection"
                  description="Detect and block automated attacks"
                  enabled={mitigationSettings.botProtection}
                  onChange={(checked) => setMitigationSettings(prev => ({...prev, botProtection: checked}))}
                />

                <MitigationControl
                  label="DDoS Protection"
                  description="Advanced DDoS mitigation rules"
                  enabled={mitigationSettings.ddosProtection}
                  onChange={(checked) => setMitigationSettings(prev => ({...prev, ddosProtection: checked}))}
                />

                <MitigationControl
                  label="SSL/TLS Encryption"
                  description="Encrypt traffic and prevent SSL-based attacks"
                  enabled={mitigationSettings.ssl}
                  onChange={(checked) => setMitigationSettings(prev => ({...prev, ssl: checked}))}
                />

                <MitigationControl
                  label="Cache Everything"
                  description="Reduce origin server load through caching"
                  enabled={mitigationSettings.cacheEverything}
                  onChange={(checked) => setMitigationSettings(prev => ({...prev, cacheEverything: checked}))}
                />

                <MitigationControl
                  label="Browser Integrity Check"
                  description="Block requests with modified browsers/clients"
                  enabled={mitigationSettings.browserIntegrityCheck}
                  onChange={(checked) => setMitigationSettings(prev => ({...prev, browserIntegrityCheck: checked}))}
                />

                <MitigationControl
                  label="Challenge Page"
                  description="Present CAPTCHA/JavaScript challenges to suspicious traffic"
                  enabled={mitigationSettings.challengePage}
                  onChange={(checked) => setMitigationSettings(prev => ({...prev, challengePage: checked}))}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tutorial">
            <div className="space-y-6">
              {tutorialSteps.map((step, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-lg">{step.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{step.content}</p>
                  </CardContent>
                </Card>
              ))}

              <Alert>
                <AlertTitle>Best Practices for DDoS Mitigation</AlertTitle>
                <AlertDescription className="space-y-2">
                  <p>1. Enable WAF and DDoS protection as your first line of defense</p>
                  <p>2. Implement rate limiting to control traffic spikes</p>
                  <p>3. Use bot protection to filter automated attacks</p>
                  <p>4. Enable caching to reduce origin server load</p>
                  <p>5. Monitor traffic patterns and adjust rules accordingly</p>
                </AlertDescription>
              </Alert>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default DDoSSimulation;
