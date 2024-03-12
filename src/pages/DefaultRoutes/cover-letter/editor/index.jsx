import { botIcon, download } from "../../../../assets";
import * as CiIcons from "react-icons/ci";
import ContentEditor from "./contentEditor";

function CoverEditor() {
  return (
    <div className="h-full w-full">
      <nav className="bg-black">
        <nav className="w-11/12 mx-auto max-w-screen-2xl flex justify-between items-center py-4">
          <nav className="flex-1 p-2"></nav>

          <div className="flex items-center gap-4">
            <div className="rounded-full w-8 h-8 bg-primary-500 flex items-center justify-center cursor-pointer">
              <img
                className="w-4 h-4 brightness-[500]"
                src={download}
                alt="download cover letter"
              />
            </div>

            <button className="bg-primary-600 py-2 px-6 text-white rounded flex items-center gap-1">
              <CiIcons.CiCirclePlus size="1.5rem" />
              <span className="text-sm">Create New</span>
            </button>
          </div>
        </nav>
      </nav>

      <div className="w-11/12 mx-auto max-w-screen-lg flex gap-4 py-6">
        <ContentEditor />

        <div title="Konecto" className="w-10 h-10 cursor-pointer">
          <img src={botIcon} alt="Konecto-bot" />
        </div>
      </div>
    </div>
  );
}

export default CoverEditor;
