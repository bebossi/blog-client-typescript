import { useState ,SyntheticEvent} from "react";
import { api } from "../api";
// import { useParams, useNavigate } from "react-router-dom";

function CreateComment( { postId }: { postId: number } ) {
    // const navigate = useNavigate()
    const [comment, setComment] = useState("")
    // const params = useParams();
    const [showForm, setShowForm] = useState(false);


    const handleSubmit = async (e: SyntheticEvent) =>  {
        e.preventDefault();
        try{
           await api.post(`/comment/${postId}`, {comment})

           setShowForm(false)


        } catch(err){
            console.log(err);
        }
    }

    const handleToggleForm = () => {
        setShowForm(!showForm);
      };

  return (
    <div>
      <button
        onClick={handleToggleForm}
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
      >
        {showForm ? "Cancel" : "Create Comment"}
      </button>

      {showForm && (
        <form onSubmit={handleSubmit} className="container mx-auto p-4">
          <h2 className="text-2xl font-bold mb-2">Create Comment</h2>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Enter comment"
            className="block w-full p-2 border border-gray-300 mb-4"
            rows={4}
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Create
          </button>
        </form>
      )}
    </div>
  )
}

export default CreateComment
