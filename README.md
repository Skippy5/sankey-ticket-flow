# Sankey Ticket Flow Visualizer

Interactive web app for visualizing ticket workflow patterns using Sankey diagrams.

## 🔗 Live Demo

**https://skippy5.github.io/sankey-ticket-flow/**

## 📊 Features

- **CSV Upload** - Load your own ticket data
- **Sample Datasets** - Multiple test datasets included
- **Column Mapping** - Flexible field selection
- **Threshold Controls** - Filter out noise from visualization
- **Interactive Diagram** - Hover for details, click to explore

## 📁 Sample Datasets

Three sample CSV files are included for testing:

| Dataset | Tickets | File Size | Best For |
|---------|---------|-----------|----------|
| **Small** | 50 | 4 KB | Quick tests, demos |
| **Medium** | 200 | 15 KB | Realistic workflows |
| **Large** | 1000 | 76 KB | Performance testing, complex patterns |

All datasets use realistic IT ticket routing patterns with multiple support groups, priorities, and resolution paths.

## 🚀 Usage

1. Open the app: https://skippy5.github.io/sankey-ticket-flow/
2. Click "Load Sample Data" to test with pre-loaded data, OR
3. Upload your own CSV file with ticket routing information
4. Map your CSV columns to the required fields:
   - **Source** - Where tickets start (e.g., "Service Desk")
   - **Path** - Routing groups (pipe-delimited: `Group1|Group2|Group3`)
   - **Target** - Where tickets close (e.g., "Network Operations")
5. Adjust thresholds to filter low-volume paths
6. Explore the Sankey diagram!

## 📋 CSV Format

Your CSV should have columns representing:
- Ticket opening group/queue
- Routing path (pipe-delimited list of groups)
- Ticket closing group/queue

Example:
```csv
ticket_id,open_group,routing_groups,closed_group
TKT-0001,Service Desk,Desktop Support,Desktop Support
TKT-0002,Service Desk,Network Ops|Cloud Infrastructure,Cloud Infrastructure
TKT-0003,Help Desk,,Help Desk
```

## 🔧 Tech Stack

- **D3.js** - Sankey diagram visualization
- **Vanilla JS** - No framework dependencies
- **GitHub Pages** - Static hosting

## 📝 Regenerating Sample Data

Run the included generator script:
```bash
node generate-samples.js
```

This creates fresh sample datasets with randomized but realistic ticket flow patterns.

## 📄 License

MIT
