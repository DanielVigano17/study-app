import { ApplicationPage } from "@/components/page-content/ApplicationPage";
import FilesPagesContent from "../_components/FilePagesContent";

export default function FilesPages({params} : {params : Promise<{materiaId : string}>}) {
  return (
    <ApplicationPage pageKey="files-page" authPage>
        <FilesPagesContent params={params} />
    </ApplicationPage>
  )
}

