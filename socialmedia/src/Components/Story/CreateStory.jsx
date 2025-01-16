import React, { useState } from 'react';
import addPattern from '../../Assets/images/ad_pattern.png';
import API from '../../Services/API';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const CreateStory = () => {
    const postImagErr = 'https://icons.veryicon.com/png/o/education-technology/alibaba-cloud-iot-business-department/image-load-failed.png';
    const userId = useSelector((state) => (state.LoginSlice.loggedUserId));
    const [fileUploaded, setFileUploaded] = useState([]);
    const [storyMessage, setStoryMessage] = useState("");
    const [selectedDuration, setSelectedDuration] = useState("24");
    const [button, setButton] = useState(false)

    const MAX_TOTAL_SIZE = 14 * 1024 * 1024; // 14MB in bytes

    let handleImageChange = (e) => {
        const files = e.target.files;
        console.log(files.size)
        const filesArray = Array.from(files);
        let totalSize = 0;

        filesArray.forEach((file) => {
            if (!file.type.startsWith('image/jpeg') && !file.type.startsWith('image/jpg') && !file.type.startsWith('image/gif') && !file.type.startsWith('image/avif') && !file.type.startsWith('image/png')) {
                toast.warning("Only JPEG, JPG, GIF, PNG, or AVIF allowed.");
                return;
            }
            totalSize += file.size; // Accumulate the size

            if (totalSize > MAX_TOTAL_SIZE) {
                toast.warning("Total file size exceeds 14MB.");
                return;
            }
        });

        // If all validations pass, convert files to Base64
        filesArray.forEach((file) => {
            let reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setFileUploaded((prevFiles) => [...prevFiles, base64String]);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleRemoveImages = () => {
        setFileUploaded([]);
    };

    const handleStory = () => {
        if (storyMessage !== "" || fileUploaded.length !== 0) {
            const postCreationTime = new Date();
            const selectedDuration = 24;

            // Calculate the total size of the uploaded images
            const totalSize = fileUploaded.reduce((acc, photo) => acc + (photo.length * (3 / 4)), 0);

            if (totalSize > MAX_TOTAL_SIZE) {
                toast.warning("Total file size exceeds 14MB.");
                return;
            }

            setButton(true)

            API.post("/createuserStory", { userId: userId, storyMessage: storyMessage, storyPhoto: fileUploaded, duration: selectedDuration, postCreationTime: postCreationTime, })
                .then((req) => {
                    if (req.data.status === 1) {
                        setButton(false);
                        toast.success("Your story has been uploaded");
                        setFileUploaded([]);
                        setStoryMessage("");
                    }
                })
                .catch(() => {
                    toast.warning("Something went wrong!!! Please Try Again Later");
                    setButton(false)
                }).finally(()=>{
                    setButton(false)
                })
            } else {
            toast.warning("Either give a message or upload any photo");
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="mt-4 relative overflow-hidden mx-auto bg-white p-7 shadow-xl rounded-lg md:w-[520px] w-full">
                <div className='text-2xl tracking-wide font-semibold text-center'>Add Story</div>
                <div className="space-y-5">
                    <div>
                        <input value={storyMessage} onChange={(e) => setStoryMessage(e.target.value)} placeholder='Story Message...' type="text" className="w-full mt-3 bg-gray-100 outline-none rounded-md py-1 pl-2 text-gray-500" />
                    </div>
                    <label htmlFor="duration" className="block mb-2 text-sm text-gray-900 font-semibold">
                        How Long Do You Want To Keep It
                    </label>
                    <select id="duration" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2" value={selectedDuration} onChange={(e) => setSelectedDuration(e.target.value)}>
                        <option value="24">24 hrs (Standard)</option>
                        <option value="12">12 hrs</option>
                        <option value="6">6 hrs</option>
                        <option value="3">3 hrs</option>
                    </select>
                    <div style={{ backgroundImage: `url(${addPattern})` }} className='shadow-xl border rounded-md'>
                        <div className="w-full h-72 relative border1 rounded-lg overflow-hidden bg-repeat">
                            <label htmlFor="createStatusUrl" className="w-fit h-fit flex flex-col justify-center items-center absolute -translate-x-1/2 left-1/2 bottom-0 z-10 pb-6 pt-10 cursor-pointer bg-gradient-to-t">
                                {fileUploaded.length === 0 ? <input onChange={(e) => handleImageChange(e)} multiple id="createStatusUrl" accept="image/*" type="file" className="hidden" /> : null}
                                {fileUploaded.length === 0 ? <><ion-icon name="Userimage" className="text-3xl text-teal-600 md hydrated" role="img" aria-label="userimage"></ion-icon><span className="text-black mt-2 text-center">Browse to Upload image </span></> : <span onClick={() => { handleRemoveImages() }} className="text-white mt-2 w-fit h-fit">Reupload</span>}
                            </label>
                            <div className='flex w-full overflow-x-scroll h-full example'>
                                {fileUploaded.length > 0 ? fileUploaded.map((photos, index) => <img id="createStatusImage" alt="imgErr" key={index} src={photos || postImagErr} onError={(e) => e.target.src = postImagErr} accept="image/png, image/jpeg" className="w-[200vw] mx-1 h-full object-cover" />) : null}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between items-center">
                        <button disabled={button} onClick={() => { handleStory() }} type="button" className={`button mx-auto w-fit bg-[#324fad] hover:bg-[#012085] text-white px-8 rounded-md text-xl py-1 ${button ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}>{button ? 'Adding...' : 'Add Story'}</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CreateStory;
