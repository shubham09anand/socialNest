import React, { useState, useEffect } from 'react';
import { useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../../Services/API';

const CreateBlog = () => {
  const postImagErr = 'https://icons.veryicon.com/png/o/education-technology/alibaba-cloud-iot-business-department/image-load-failed.png';
  const [fileUploaded, setFileUploaded] = useState([]);
  const userId = useSelector((state) => (state.LoginSlice.loggedUserId));
  const [button, setButton] = useState(false)
  const MAX_FILE_SIZE = 14 * 1024 * 1024;

  let handleImageChange = (e) => {
    const files = e.target.files;
    const filesArray = Array.from(files);
    let totalSize = filesArray.reduce((acc, file) => acc + file.size, 0);

    if (totalSize > MAX_FILE_SIZE) {
      toast.warning("Total file size exceeds 14MB.");
      return;
    }

    const validTypes = ['image/jpeg', 'image/jpg', 'image/gif', 'image/avif', 'image/png'];
    const invalidFiles = filesArray.filter(file => !validTypes.includes(file.type));

    if (invalidFiles.length > 0) {
      toast.warning("Only JPEG, JPG, GIF, PNG, or AVIF allowed.");
      return;
    }

    filesArray.forEach((file) => {
      let reader = new FileReader();
      reader.onloadend = () => {
        let base64String = reader.result;
        setFileUploaded((prevFiles) => [...prevFiles, base64String]);
      };
      reader.readAsDataURL(file);
    });
  };


  const [formData, setFormData] = useState({
    titleofArticle: '',
    fileUploaded,
    paragraphs: [
      { titleofpara: '', contentofpara: '', required: true }
    ],
  });

  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      fileUploaded: fileUploaded
    }));
  }, [fileUploaded]);

  const initialFormData = {
    titleofArticle: '',
    fileUploaded: [],
    paragraphs: [
      { titleofpara: '', contentofpara: '', required: true }
    ]
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setFileUploaded([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setButton(true)

    const reqObj = {
      userID: userId,
      articleTitle: formData.titleofArticle,
      articlePhotos: formData.fileUploaded,
      paragraphs: formData.paragraphs.map(e => ({ title: e.titleofpara, content: e.contentofpara })),
      tags: formData.articleTags
    };

    API.post("/createArticle", reqObj).then((req, _) => {
        if (req.data.status === 1) {
          setButton(false)
          toast.success("Your Article is Created");
          resetForm();
        }
      })
      .catch(() => {
        setButton(false)
        toast.error("Something Went Wrong!!! Please Try Again Later");
      }).finally(() => {
        setButton(false)
      })
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleParagraphChange = (index, e) => {
    const { name, value } = e.target;
    const newParagraphs = [...formData.paragraphs];
    newParagraphs[index] = { ...newParagraphs[index], [name]: value };
    setFormData((prevData) => ({ ...prevData, paragraphs: newParagraphs }));
  };

  const addParagraph = () => {
    setFormData((prevData) => ({
      ...prevData,
      paragraphs: [...prevData.paragraphs, { titleofpara: '', contentofpara: '', required: false }]
    }));
  };

  const removeParagraph = (index) => {
    if (formData.paragraphs.length > 1) {
      const newParagraphs = [...formData.paragraphs];
      newParagraphs.splice(index, 1);
      setFormData((prevData) => ({ ...prevData, paragraphs: newParagraphs }));
    }
  };

  return (
    <div className="flex w-screen lg:w-[80%] lg:p-5 lg:absolute right-0 items-center justify-center lg:mt-5">
      <ToastContainer />
      <form className="bg-white rounded-lg md:p-4 p-2 w-full md:w-3/4" onSubmit={handleSubmit}>
        <div className='flex space-x-5 py-2'>
          <Link to={`/blog`} style={{ textDecoration: 'none', color: 'black' }} >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-10 h-10 p-2 lg:ml-20 bg-[#6f8fe2] rounded-full hover:opacity-60 lg:absolute top-8 left-0 z-10 cursor-pointer ">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </Link>
          <div className="text-2xl mb-2 font-semibold">Create Your Article</div>
        </div>
        <div className="mb-4">
          <input type="text" id="titleofArticle" name="titleofArticle" placeholder="Enter Title Article" className="outline-none border-2 border-[#6f90e2] text-xl rounded pl-2 py-2 w-full placeholder:text-xl placeholder:font-extralight" value={formData.titleofArticle} onChange={handleChange} required />
        </div>

        <div className="flex items-center justify-center w-full">
          {fileUploaded.length === 0 ? (
            <>
              <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-[#6f90e2] border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                    <path stroke="#6f90e2" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" ></path>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Click to upload</span></p>
                  <p className="text-xs text-gray-500">SVG, PNG, JPG</p>
                  <p className="text-xs text-red-500">Upto 5 images are Supported </p>
                </div>
                <input multiple accept="image/*" onChange={(e) => handleImageChange(e)} id="dropzone-file" type="file" className="hidden" />
              </label>
            </>
          ) : (
            <>
              <div className='w-fit overflow-x-scroll flex space-x-5 p-5'>
                {fileUploaded.slice(0, 5).map((url, index) => (
                  <img key={index} src={url || postImagErr} alt={`Uploaded file ${index}`} className='rounded-sm object-cover w-96 h-48 md:w-[600px] md:h-[350px] select-none' draggable="false" />
                ))}
              </div>
            </>
          )}

        </div>
        {fileUploaded.length === 0 ? (
          null
        ) : (
          <>
            <div className='flex space-x-4 place-content-center items-center text-white  bg-black w-fit h-fit mt-2 font-semibold tracking-wide px-4 py-1 rounded-md cursor-pointer active:opacity-50' onClick={() => setFileUploaded([])}><span>Reupload</span>
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                </svg>
              </span>
            </div>
          </>
        )}

        <div className="mt-3 active:opacity-50 bg-[#6f90e2] text-thin flex space-x-5 text-white w-fit h-fit px-4 py-1 rounded-sm cursor-pointer" onClick={addParagraph}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <div>Add more Paragraph</div>
        </div>

        <div id="paragraphs" className="mb-1 p-2">
          {formData.paragraphs.map((paragraph, index) => (
            <div key={index} className="mb-2">
              <div className="flex justify-between mt-3">
                <label className="font-semibold mb-2 block">Title of Paragraph {index + 1}</label>
                {index > 0 && (
                  <svg className="remove-paragraph cursor-pointer w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" onClick={() => removeParagraph(index)}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                )}
              </div>

              <input type="text" name="titleofpara" placeholder="Enter Title for the paragraph" className="border rounded px-4 py-2 w-full" value={paragraph.titleofpara} onChange={(e) => handleParagraphChange(index, e)} required={paragraph.required} />

              <label className="font-semibold mb-2 block">Content of Paragraph</label>
              <textarea name="contentofpara" placeholder="Enter content for the paragraph" className="border  rounded px-4 py-2 w-full h-24" value={paragraph.contentofpara} onChange={(e) => handleParagraphChange(index, e)} required={paragraph.required}></textarea>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center ml-2">
          <button disabled={button} type="submit" className={`bg-[#4f79e2] text-white rounded px-4 py-2 ${button ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>
            {button ? 'Create' : 'Creating'}
          </button>
        </div>
      </form>
    </div>
  );
};
export default React.memo(CreateBlog);