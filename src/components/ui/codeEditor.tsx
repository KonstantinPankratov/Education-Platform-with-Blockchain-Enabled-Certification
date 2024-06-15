import React from 'react';
import Editor, { OnChange } from '@monaco-editor/react';

const CodeEditor: React.FC = () => {
  const [code, setCode] = React.useState<string>(`
    const numbers = [45, 4, 9, 16, 25];

    let txt = "";
    numbers.forEach(myFunction);

    function myFunction(value) {
    // Complete this function ...
    }`);

  const handleEditorChange: OnChange = (value) => {
    setCode(value || '');
  };

  return (
    <div className='rounded-lg overflow-hidden'>
        <Editor
            className="h-full w-full"
            language="typescript"
            theme="vs-dark"
            value={code}
            onChange={handleEditorChange}/>
    </div>
  );
};

export default CodeEditor;