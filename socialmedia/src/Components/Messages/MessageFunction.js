import API from '../../Services/API';

export const getMessage = async ({ sender_id, reciver_id, page }) => {
     const resposne = await API.post("/getMessage", { sender_id, reciver_id, page });
     return resposne?.data;
}

export const handleDownloadImage = (url, id) => {
     const anchor = document.createElement('a');
     anchor.href = url;
     anchor.download = `Photo-${id}`;
     anchor.click();
};