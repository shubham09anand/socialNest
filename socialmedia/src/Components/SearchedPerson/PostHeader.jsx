import React from 'react';
import moment from 'moment';
import noProfilePicture from '../../Assets/NoProileImage.png';

const PostHeader = ({ PostDetails, post }) => {
	return (
		<div className="flex gap-3 sm:p-4 p-2.5 pl-0 text-sm font-medium">
			<img src={PostDetails?.Post[0]?.postMaker[0].profilePhoto || noProfilePicture} onError={(e) => e.target.src = noProfilePicture} alt="" className="w-9 h-9 rounded-full object-cover border-black" style={{ border: '2px solid' }} />
			<div className="flex-1">
				<div>
					<div className="text-black">{post?.userSignupInfo[0]?.firstName}{' '} {post?.userSignupInfo[0]?.lastName}</div>
				</div>
				<div className="text-xs font-semibold text-gray-800">
					{moment(post?.postMaker?.createdAt).format('D MMMM YYYY')}{' '}, {moment(post?.postMaker?.createdAt).format('h:mm A')}
				</div>
			</div>
		</div>
	)
}

export default PostHeader