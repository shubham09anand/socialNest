import React from 'react';

const CreateGroup = () => {
     return (

          <div className='!visible transition-opacity duration-150 bg-background text-foreground !opacity-100'>
               <div className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-3xl" data-id="1" data-v0-t="card">
                    <div className="flex flex-col space-y-1.5 p-6" data-id="2">
                         <h3 className="text-2xl font-semibold leading-none tracking-tight" data-id="3">Create New Group</h3>
                    </div>
                    <div className="p-6 pt-0 space-y-4" data-id="5">
                         <div className="flex items-center space-x-6">
                              <div className="shrink-0">
                                   <img id="group_preview_img" className="h-16 w-16 object-cover rounded-full" src="https://lh3.googleusercontent.com/a-/AFdZucpC_6WFBIfaAbPHBwGM9z8SxyM1oV4wB4Ngwp_UyQ=s96-c" alt="Group profile photo" />
                              </div>
                              <label className="block">
                                   <span className="sr-only">Choose group profile photo</span>
                                   <input type="file" className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100" />
                              </label>
                         </div>
                         <div className="items-center">
                              <label className="text-sm font-semibold text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-[200px]" htmlFor="group_name">Group Name</label>
                              <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="group_name" placeholder="Enter group name" />
                         </div>
                         <div className="items-center">
                              <label className="text-sm font-semibold text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-[200px]" htmlFor="group_description">Group Description</label>
                              <input className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="group_description" placeholder="Enter group description" type="text" />
                         </div>
                    </div>
               </div>
          </div>
     );
};

export default CreateGroup;
