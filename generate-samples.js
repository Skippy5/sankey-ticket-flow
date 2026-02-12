#!/usr/bin/env node

const fs = require('fs');

const priorities = ['P1', 'P2', 'P3', 'P4'];
const openGroups = ['Service Desk', 'Help Desk', 'Network Operations', 'Security Operations'];
const routingGroups = [
  'Desktop Support',
  'Network Operations',
  'Cloud Infrastructure',
  'Security Operations',
  'Identity & Access',
  'Application Development',
  'Database Administration',
  'Email & Collaboration',
  'Storage & Backup',
  'Telephony'
];

function randomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateTicket(id) {
  const priority = randomElement(priorities);
  const openGroup = randomElement(openGroups);
  
  // P4 tickets: 70% resolved by Service Desk directly (no routing)
  // P3 tickets: 40% resolved directly
  // P2 tickets: 20% resolved directly
  // P1 tickets: 5% resolved directly
  const directResolveChance = priority === 'P4' ? 0.7 : priority === 'P3' ? 0.4 : priority === 'P2' ? 0.2 : 0.05;
  
  let routing = '';
  let closedGroup = openGroup;
  let resolutionHours = 0.3;
  
  if (Math.random() > directResolveChance) {
    // Generate routing path (1-3 groups)
    const numHops = randomInt(1, 3);
    const hops = [];
    
    for (let i = 0; i < numHops; i++) {
      let nextGroup;
      do {
        nextGroup = randomElement(routingGroups);
      } while (hops.includes(nextGroup));
      hops.push(nextGroup);
    }
    
    routing = hops.join('|');
    closedGroup = hops[hops.length - 1];
    
    // Resolution time based on priority and hops
    const baseTime = priority === 'P1' ? 24 : priority === 'P2' ? 12 : priority === 'P3' ? 6 : 2;
    resolutionHours = (baseTime + numHops * 3 + Math.random() * 5).toFixed(1);
  } else {
    resolutionHours = (Math.random() * 2).toFixed(1);
  }
  
  return `TKT-${String(id).padStart(4, '0')},${priority},${openGroup},${routing},${closedGroup},${resolutionHours}`;
}

function generateDataset(name, count) {
  const lines = ['ticket_id,priority,open_group,routing_groups,closed_group,resolution_hours'];
  
  for (let i = 1; i <= count; i++) {
    lines.push(generateTicket(i));
  }
  
  const filename = `sample-data-${name}.csv`;
  fs.writeFileSync(filename, lines.join('\n'));
  console.log(`✅ Generated ${filename} (${count} tickets, ${lines.length} total lines)`);
}

// Generate three datasets
generateDataset('small', 50);
generateDataset('medium', 200);
generateDataset('large', 1000);

console.log('\n📊 Sample datasets created!');
