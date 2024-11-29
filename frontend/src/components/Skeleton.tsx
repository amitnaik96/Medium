import { Circle } from "./BlogCard";

// Took the FullBlog and Blogcard component and added animate oulse and other divs from Flowbite 
export const BlogsSkeleton = () => {
    return <>
                <div className="border-b p-2 mb-3 flex flex-col justify-center animate-pulse">
                    <div className="flex mb-3 w-screen">
                        <div className="h-2 bg-gray-200 rounded-full  w-32  pr-2"></div>
                        <div className="flex flex-col justify-center ml-2">
                            <Circle />
                        </div>
                        <div className="flex flex-col justify-center pl-2">
                            <div className="h-2 bg-gray-200 rounded-full  w-32 "></div>
                        </div>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full w-full  mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full   mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full   mb-2.5"></div>
                </div>
        </>

}

export const FullBlogSkeleton = () => {
    return <>
            <div className="flex justify-center animate-pulse">
                <div className="grid grid-rows-2 lg:grid-cols-12 max-w-screen-xl px-10 pt-12">
                    <div className="col-span-8 px-3 mt-3">
                        <div className="h-2.5 bg-gray-200 rounded-full  mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full w-48  mb-2.5"></div>
                        <div className="pt-2">
                        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                        <div className="h-2 bg-gray-200 rounded-full mb-2.5"></div>
                        </div>
                    </div>
                    <div className="mt-3 px-5 lg:col-span-4">
                        <div className="h-2 bg-gray-200 rounded-full  w-32 mb-2.5"></div>
                        <div className="flex pt-3">
                            <div className="pr-4 flex flex-col justify-center">
                                <div className="h-7 bg-gray-200 rounded-full w-7 mb-2.5"></div>
                            </div>
                            <div>
                                <div className="flex flex-col justify-center">
                                <div className="h-2 bg-gray-200 rounded-full  w-48 mb-2.5"></div>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full  w-48 mb-2.5"></div>
                            </div>
                        </div>
                    </div>
            
                </div>
            </div>
    </>
}