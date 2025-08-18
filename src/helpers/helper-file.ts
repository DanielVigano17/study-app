export default class HelperFile {

    static getFilePathFromUrl(fileUrl : string) : string {
        const ulr = new URL(fileUrl);
        const pathParts = ulr.pathname.split('/');

        const filename = pathParts[pathParts.length - 1];

        return filename;
    }



}