import React from 'react';
import Editor, { OnChange } from '@monaco-editor/react';

const CodeEditor: React.FC = () => {
  const [code, setCode] = React.useState<string>(`const numbers = [45, 4, 9, 16, 25];\n\nlet txt = "";\n\nnumbers.forEach(myFunction);\n\nfunction myFunction(value) {\n  // Complete this function ...\n}`);

  const handleEditorChange: OnChange = (value) => {
    setCode(value || '');
  };

  return (
    <div className='rounded-md overflow-hidden h-full mb-5'>
        <Editor
            className="h-full w-full"
            language="javascript"
            theme="vs-dark"
            value={code}
            onChange={handleEditorChange}/>
    </div>
  );
};

export default CodeEditor;