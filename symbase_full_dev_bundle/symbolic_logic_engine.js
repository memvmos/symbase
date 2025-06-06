// symbolic_logic_engine.js

// Load symbolic glossary and match symbols to their state/meaning
class SymbolicLogicEngine {
  constructor(glossaryText) {
    this.symbolMap = this.parseGlossary(glossaryText);
  }

  parseGlossary(text) {
    const lines = text.split('\n');
    const map = {};
    let currentSymbol = null;

    lines.forEach(line => {
      const [key, ...rest] = line.split(':').map(part => part.trim());
      const value = rest.join(':');

      if (key === "SYMBOL") {
        currentSymbol = value;
        map[currentSymbol] = {};
      } else if (currentSymbol && key && value) {
        map[currentSymbol][key.toLowerCase()] = value;
      }
    });

    return map;
  }

  interpretSymbol(symbol) {
    if (this.symbolMap[symbol]) {
      return this.symbolMap[symbol];
    } else {
      return { meaning: "unknown", state: "undefined" };
    }
  }

  explain(symbol) {
    const entry = this.interpretSymbol(symbol);
    return `${symbol} → Meaning: ${entry.meaning}, State: ${entry.state}`;
  }
}

// Example usage:
// const glossaryText = document.getElementById("glossary").textContent;
// const engine = new SymbolicLogicEngine(glossaryText);
// console.log(engine.explain("🔺"));
