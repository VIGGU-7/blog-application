import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Comment from '../components/Comment';
import Viewcomments from '../components/Viewcomments';
import { useAuthStore } from '../lib/store';
import { FaHeart } from 'react-icons/fa';
function Blogview() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFound, setIsFound] = useState(false);
  const [response, setResponse] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLiked,setIsLiked]=useState(null)
  const { id } = useParams();
  const { commentPosted } = useAuthStore();
  const onLike=async()=>{
    try {
      const res = await apiInstance.get(`/like/${id}`);
      setIsLiked(res.data.liked)
    } catch (error) {
      toast.error(error?.res?.data?.message)
    }finally{
       setIsLoading(false);
    }
  }
  const getBlog = async () => {
    try {
      const res = await apiInstance.get(`/blog/${id}`);
      setResponse(res.data);
      setComments(res.data.comments);
      setIsFound(true);
      console.log(res.data)
    } catch (error) {
      console.log("Something went wrong");
      toast.error("Blog not found");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getBlog();
    onLike();
  }, [id]);

  useEffect(() => {
    if (commentPosted) {
      getBlog();
    }
  }, [commentPosted]);

  if (isLoading) {
    return <p className='text-center mt-10'>Loading blog...</p>;
  }

  if (!isFound || !response) {
    return (
      <div className='flex items-center justify-center mt-10'>
        <p className='text-xl font-semibold'>Blog Not Found</p>
      </div>
    );
  }
  console.log(comments)
  return (
    <>
      <Navbar />
      <div className='flex justify-center'>
        <div className='p-5 max-w-3xl'>
          <h1 className='text-4xl font-bold mb-4'>{response.title}</h1>

          <div className='flex items-center mb-4'>
            <img
              className='rounded-full w-10 h-10 object-cover'
              src={response.ownerDetails?.profilePic || "https://via.placeholder.com/100"}
              alt={response.ownerDetails?.userName || "Unknown"}
            />
            <p className='ml-3 text-gray-700 font-medium'>
              {response.ownerDetails?.userName || "Unknown Author"}
            </p>
             <FaHeart className={`${isLiked ? "text-red-600":"text-gray-600"} ml-auto`} onClick={onLike}/>
          </div>

          <img
            className="rounded-xl w-120 mb-4"
            src={response.image}
            alt={response.title}
          />

          <p className='text-gray-700 mb-6'>{response.content}</p>

          <Comment blogId={id} />

          <div className="mt-6 space-y-4">
            {comments.length > 0 && (
  <div className="mt-6 space-y-4">
    {comments.map((comment) => (
      <Viewcomments
        key={comment._id}
        ownerId={comment.ownerDetails._id}
        comment={comment.comment}
        commentId={comment._id}
        userAvatar={comment.ownerDetails?.image}
        userName={comment.ownerDetails?.userName}
      />
    ))}
  </div>
)}

          </div>
        </div>
      </div>
    </>
  );
}

export default Blogview;
