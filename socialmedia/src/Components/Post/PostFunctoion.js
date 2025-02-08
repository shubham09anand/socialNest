import API from '../../Services/API';

export const Settings = {
     arrows: true,
     dots: true,
     infinite: true,
     speed: 500,
     slidesToShow: 1,
     slidesToScroll: 1,
};

const handleLike = async (postId, likedBy) => {
     try {
          const res = await API.post("/giveLike", { postId: postId, likedBy: likedBy });
          return res?.data?.message;
     } catch (error) {
          console.log(error);
     }
};

export const handleLikeIncrDcr = async (postId, likedBy, index) => {
     const status = await handleLike(postId, likedBy);
     const likeSpan = document.getElementById(index + 'postLike').querySelector('span');
     let currentLikes = parseInt(likeSpan.innerHTML);

     if (status === "Post liked successfully") {
          likeSpan.innerHTML = currentLikes + 1;
     } else if (status === "Like removed successfully") {
          likeSpan.innerHTML = currentLikes - 1;
     }
};

export const fetchPost = async (page) => {
     const response = await API.post('/postDetails', { page: page });
     return response?.data;
}