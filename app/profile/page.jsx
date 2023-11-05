"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Profile from "@components/Profile";

const MyProfile = () => {
  const { data: session } = useSession();
  const router=useRouter();
  // console.log(session);
  const [myPosts, setMyPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      console.log("Hii");
      if (session?.user.id) {
        try {
          const response = await fetch(`/api/user/${session.user.id}/posts`);
          if (response.ok) {
            const data = await response.json();
            setMyPosts(data);
          } else {
            console.error("Failed to fetch posts:", response.status);
          }
        } catch (error) {
          console.error("Error while fetching posts:", error);
        }
      } else {
        console.log("fuck you");
      }
    };
     fetchPosts();
    
  }, [session]);
  

  const handleEdit = (post) => {
    router.push(`/update-prompt?id=${post._id}`)
    
  };
  const handleDelete = async (post) => {
    const hasConfirmed=confirm("Are you sure you want to delete these prompt?")
    try {
      await fetch(`/api/prompt/${post._id.toString()}`,{
        method:"DELETE"
      });
      const filteredPosts=myPosts.filter((p)=>p._id!==post._id);
      setMyPosts(filteredPosts);
    } catch (error) {
      console.log(error);
    }

  };
  myPosts?.length != 0 && console.log(myPosts);
  return (
    <div>
      {myPosts?.length != 0 && (
        <Profile
          name="My"
          desc="welcome to your personalized page"
          data={myPosts}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default MyProfile;
