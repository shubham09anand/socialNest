import React from 'react';
import axios from 'axios';
import moment from 'moment';
import newsTemplate from '../../Assets/images/NewsImage.jpg';
import LoadingNewsAnimation from '../Animation/LoadingNewsAnimation';
import ServerError from '../Animation/ServerError';
import { useQuery } from '@tanstack/react-query';

const News = () => {

     const fetchData = async () => {
          const apiKey = 'xNomhkVetThz3DOz48oQXTspUZi6gxG9';
          const apiUrl = `https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${apiKey}`;
          const response = await axios.get(apiUrl);
          return response?.data?.results;
     }

     const { data: newsData, isLoading: loading, isError: error } = useQuery({
          queryKey: (['getNews']),
          queryFn: fetchData,
          staleTime: Infinity,
     })

     return (
          <div className="w-full lg:w-[85%] lg:p-5 lg:absolute right-0 pt-4 pb-12 lg:py-12">
               <div className="max-w-md mx-auto text-center">
                    <h2 className="text-4xl font-bold md:py-4">News</h2>
               </div>
               {!loading && !error && (
                    <div className="flex min-h-screen w-full">
                         <div className="p-2 flex flex-wrap gap-4 w-full place-content-center items-center">
                              {newsData?.map((record) => (
                                   <div title={"Read " + record.abstract} className="w-96 bg-white border-b pb-2" key={record.url}>
                                        {record.multimedia === null ? (
                                             <img src={newsTemplate} alt="" className='h-52 w-full object-cover' />
                                        ) : (
                                             <>
                                                  {record.multimedia.slice(0, 1).map((media, index) => (
                                                       <img key={index} className="h-52 w-full object-cover" src={media.url} alt={`Media ${index}`} />
                                                  ))}
                                             </>
                                        )}
                                        <a href={record.url} style={{ color: "black", textDecoration: "none" }}>
                                             <div className='font-semibold text-2xl my-2 select-none'>{record?.title}</div>
                                             <div className='text-xs font-bold my-2 select-none'>{moment(record.pubDate).format('MMMM DD, YYYY')}</div>
                                             <div className='text-sm my-2 select-none'>{record?.abstract}</div>
                                             <div className="flex space-x-3 place-content-center items-center w-fit">
                                                  <div className="text-xs select-none">
                                                       <div>{record?.byline}</div>
                                                  </div>
                                             </div>
                                        </a>
                                   </div>
                              ))}
                         </div>
                    </div>
               )}

               {loading &&
                    <div className='flex flex-wrap place-content-center items-center'>
                         <LoadingNewsAnimation />
                         <LoadingNewsAnimation />
                         <LoadingNewsAnimation />
                         <LoadingNewsAnimation />
                         <LoadingNewsAnimation />
                         <LoadingNewsAnimation />
                    </div>}
               {error && <ServerError width={96} height={52} paddingTop={20} />}
          </div>
     );
};

export default News;
