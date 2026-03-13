
import { useState } from "react";
import BlocklyEditor from "./components/BlocklyEditor";
import PreviewPanel from "./components/PreviewPanel";
import CodePanel from "./components/CodePanel";
import { generateCode } from "./generator/codeGenerator";

function App() {

  const [code, setCode] = useState({ html: "", css: "", js: "" });
  const [workspace, setWorkspace] = useState(null);

  function handleGenerate() {

    if (!workspace) return;

    const blocks = workspace.getTopBlocks(true);
    const model = [];

    blocks.forEach(block => {
      model.push({
        type: block.type,
        text: block.getFieldValue("TEXT") || "",
        label: block.getFieldValue("LABEL") || "",
        value: block.getFieldValue("VALUE") || ""
      });
    });

    const result = generateCode(model);
    setCode(result);
  }

  return (
    <div className="appShell">

      <header className="topbar">
        <h1>Visual Web Builder</h1>
        <button className="primaryButton" onClick={handleGenerate}>
          Generate
        </button>
      </header>

      <main className="mainLayout">

        <section className="editorSection">
          <BlocklyEditor setWorkspace={setWorkspace} />
        </section>

        <section className="outputSection">
          <PreviewPanel code={code} />
          <CodePanel code={code} />
        </section>

      </main>

    </div>
  );
}

export default App;
