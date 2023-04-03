import { appInstance } from "./axios";

interface DataSend {
    accounts: number[];
    showGraphs: boolean;
    typeAccount: number;
    dateEnd?: string;
    dateStart?: string;
}
export enum FileType {
    PDF = 'pdf',
    XLSX = 'xlsx',
}

export const downloadReport = (url: string,name: string,format: FileType , data: DataSend) => {

    appInstance.post(`download/${url}/${format}`, {
        ...data
    }, { responseType: 'blob' })
        .then((response) => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${name}.${format}`);
            document.body.appendChild(link);
            link.click();
        })
        .catch((err) => {
            // TODO Manejar el error
        })
}