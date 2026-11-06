
const fs = require("fs");
const data = fs.readFileSync("c:/Users/Ganes/Downloads/decetive/decetive/src/data/initialData.ts", "utf8");
const match = data.match(/id: "5".*?content: `([^`]+)`/s);
if (!match) {
  const match2 = data.match(/id: .5.,[\s\S]*?content: `([\s\S]*?)`/);
  if (match2) {
    const content = match2[1];
    const faqHeaderIndex = content.search(/^[#\s]*(Frequently|Commonly) Asked Questions/im);
    console.log("faqHeaderIndex:", faqHeaderIndex);
    if (faqHeaderIndex !== -1) {
      const faqText = content.substring(faqHeaderIndex);
      const lines = faqText.split("\n");
      const faqs = [];
      let currentQuestion = "";
      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed) continue;
        if (trimmed.toLowerCase().includes("frequently asked questions") || trimmed.toLowerCase().includes("commonly asked questions") || trimmed.toLowerCase().match(/^#+\s*faqs?/)) {
            continue;
        }
        const isQuestion = 
          /^\*\*?\s*(Q|q)?\d+[\.:\]]/i.test(trimmed) || 
          /^\d+[\.:\]]\s*.*(\?\*\*|\?)$/.test(trimmed) ||
          /^\*\*?\s*Q\s*:/i.test(trimmed) ||
          (trimmed.startsWith("**") && trimmed.endsWith("**") && (trimmed.includes("?") || trimmed.toLowerCase().includes("what") || trimmed.toLowerCase().includes("when") || trimmed.toLowerCase().includes("how") || trimmed.toLowerCase().includes("why") || trimmed.toLowerCase().includes("is a") || trimmed.toLowerCase().includes("who")));
        if (isQuestion) {
          console.log("Question found:", trimmed);
          faqs.push(trimmed);
        }
      }
      console.log("Found FAQs:", faqs.length);
    }
  } else {
    console.log("No match found for Article 5 content");
  }
}

