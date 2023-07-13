import { useState } from "react"
import MDEditor from "@uiw/react-md-editor"

const TextEditor: React.FC = () => {
const [value, setValue] = useState('')
    return <div>
        <MDEditor.Markdown source={'# Header'}/>
    </div>
}
export default TextEditor