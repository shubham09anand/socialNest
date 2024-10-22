import React, { useState } from 'react';
import addPattern from '../../Assets/images/ad_pattern.png';
import { useSelector } from 'react-redux';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import API from '../../Services/API';

const CreatePost = () => {
    const postImagErr = 'https://icons.veryicon.com/png/o/education-technology/alibaba-cloud-iot-business-department/image-load-failed.png';
    const userId = useSelector((state) => state.LoginSlice.loggedUserId);
    const [fileUploaded, setFileUploaded] = useState([]);
    const [PostMessage, setPostMessage] = useState("");
    const [tags, setTags] = useState([]);
    const [button, setButton] = useState(false);
    const [index, setIndex] = useState(0);

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

    const handleRemoveImages = () => {
        setFileUploaded([]);
        setPostMessage("");
    };

    const addTag = () => {
        setTags([...tags, '']);
    };

    const handleTagChange = (index, value) => {
        const newTags = [...tags];
        newTags[index] = value;
        setTags(newTags);
    };

    const removeTag = (index) => {
        if (tags.length > 1) {
            const newTags = [...tags];
            newTags.splice(index, 1);
            setTags(newTags);
        }
    };

    const handlePost = () => {
        if (PostMessage.trim() !== "" || fileUploaded.length !== 0) {
            setButton(true)
            API.post("/makePost", { userId: userId, message: PostMessage, postPhoto: fileUploaded, postTags: tags })
                .then((req, _) => {
                    if (req.data.status === 1) {
                        setButton(false)
                        toast.success("Your post has been uploaded");
                        setPostMessage("");
                        setFileUploaded([]);
                        setTags([]);
                    }
                })
                .catch(() => {
                    setButton(false)
                    toast.warning("Something went wrong!!! Please Try Again Later");
                }).finally(() => {
                    setButton(false)
                })
        } else {
            toast.warning("Please provide a message or upload a photo.");
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="relative mt-3 mb-5 overflow-hidden mx-auto p-7 shadow-xl rounded-lg md:w-[650px] w-full">
                <div className='text-2xl lg:mt-10 tracking-wide font-semibold text-center'>Add Post</div>
                <div className="space-y-5">
                    <div>
                        <input value={PostMessage} onChange={(e) => setPostMessage(e.target.value)} placeholder='Post Message...' type="text" className="w-full mt-3 bg-gray-100 outline-none rounded-md py-1 pl-2 text-gray-500" />
                    </div>
                    <div style={{ backgroundImage: `url(${addPattern})` }} className='shadow-xl border rounded-md'>
                        <div className="w-full h-72 relative border1 rounded-lg overflow-hidden bg-repeat">
                            <label htmlFor="createStatusUrl" className="w-fit h-fit flex flex-col justify-center items-center absolute -translate-x-1/2 left-1/2 bottom-0 z-10 pb-6 pt-10 cursor-pointer bg-gradient-to-t">
                                {fileUploaded.length === 0 ? <input onChange={(e) => handleImageChange(e)} multiple id="createStatusUrl" accept="image/*" type="file" className="hidden" /> : null}
                                {fileUploaded.length === 0 ? <><ion-icon name="postImage" className="text-3xl text-teal-600 md hydrated" role="postImg"></ion-icon><span className="text-black mt-2 text-center bg-white">Browse to Upload image </span></> : <span onClick={() => handleRemoveImages()} className="text-gray-400 mt-2 w-fit h-fit">Re-upload</span>}
                            </label>
                            <div className='flex w-full overflow-x-scroll h-full example'>
                                {fileUploaded?.length > 0 && (
                                    <div className='h-full w-full relative'>
                                        <div onClick={() => index === 0 ? setIndex(fileUploaded?.length - 1) : setIndex(index - 1)} className="rounded-full bg-[#5a71ba] backdrop-blur p-2 cursor-pointer active:opacity-75 absolute top-[40%] left-5">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-8">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                                            </svg>
                                        </div>
                                        <div onClick={() => index === (fileUploaded?.length - 1) ? setIndex(0) : setIndex(index + 1)} className="rounded-full bg-[#5a71ba] backdrop-blur p-2 cursor-pointer active:opacity-75 absolute top-[40%] right-5">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="size-8">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                                            </svg>
                                        </div>
                                        <img onError={(e) => e.target.src = postImagErr} src={fileUploaded[index] || postImagErr} alt="UploadedImage" className="w-full mx-1 h-full object-contain" />
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className='mt-4'>
                        <div className='flex place-content-center items-center w-fit space-x-5'>
                            <div>Want to Add Tags</div>
                            <div>
                                {tags.length < 7 ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="w-4 h-4 mb-1 bg-[#6f8ee1] rounded-full cursor-pointer mt-1" onClick={addTag}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                ) : null}
                            </div>
                        </div>
                        <div className='flex gap-4 flex-wrap'>
                            {tags.map((tag, index) => (
                                <div key={index} className='mt-2 relative w-fit'>
                                    <div className='tag'>
                                        <input type="text" className='focus:bg-gray-300 focus:border-gray-100 focus:text-gray-800 w-32 md:w-28 border-2 pl-2 p-1 border-gray-900 outline-none rounded-2xl' value={tag} onChange={(e) => handleTagChange(index, e.target.value)} />
                                        {index > 0 ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="#d1420f" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" className="cursor-pointer active:opacity-50 absolute z-10 -top-2 -right-3 w-6 h-6" onClick={() => removeTag(index)}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                        ) : null}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-between items-center">
                        <button disabled={button} onClick={handlePost} type="button" className={`button mx-auto bg-[#3954aa] hover:bg-[#072daa] text-white px-8 rounded-md text-xl py-1 ${button ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>{button ? 'Creating...' : 'Create'}</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreatePost;
