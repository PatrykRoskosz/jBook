import { useRef, useEffect } from "react";
import "./preview.css";

interface PreviewProps {
	code: string;
  errorState: string;
}

const html = `
    <html>
      <head>
        <style>html {background-color: white}> </style>
      </head>
      <body>
        <div id="root"></div>
        <script>
        const handleError = (err) => {
          const root = document.querySelector('#root');
          root.innerHTML = '<div style="color: red;"><h4>Runtime Error</h4>' + err + '</div>';
          console.error(err);
        }

          window.addEventListener('error', (event)=> {
            event.preventDefault();
            handleError(event.error) 
          })
          window.addEventListener('message', (event) => {
            try {
              eval(event.data);
            } catch (err) {
              if (err instanceof Error) {
                return {
                  code: "",
                  err: err.message,
                };
              } else {
                throw err;
              }
            }
          }, false);
        </script>
      </body>
    </html>
  `;

const Preview: React.FC<PreviewProps> = ({ code, errorState }) => {
	const iframe = useRef<any>();

	useEffect(() => {
		iframe.current.srcdoc = html;
		const timer = setTimeout(() => {
			iframe.current.contentWindow.postMessage(code, "*");
		}, 50);

    return () => {
      clearTimeout(timer)
    }
	}, [code]);

 

	return (
		<div className='preview-wrapper'>
			<iframe
				title='preview'
				ref={iframe}
				sandbox='allow-scripts'
				srcDoc={html}
			/>
      {errorState && <div className="preview-error">{errorState}</div>}
		</div>
	);
};

export default Preview;
