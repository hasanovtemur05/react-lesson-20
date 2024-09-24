import axios from "axios";
import { useEffect, useState } from "react";
import { GroupTable, GroupModal } from "@components";
import Button from "@mui/material/Button";

const Group = () => {
  const [data, setData] = useState([]);
  const [course, setCourse] = useState([]); 
  const [open, setOpen] = useState(false); 
  const [editingGroup, setEditingGroup] = useState({}); 

  useEffect(() => {
    axios
      .get("http://localhost:3000/group")
      .then((res) => {
        setData(res?.data);
      })
      .catch((error) => {
        console.error("Error fetching group data: ", error);
      });

    axios
      .get("http://localhost:3000/course")
      .then((res) => {
        setCourse(res?.data);
      })
      .catch((error) => {
        console.error("Error fetching course data: ", error);
      });
  }, []);

  const handleClose = () => {
    setOpen(false);
    setEditingGroup({}); 
  };


  const openModal = () => {
    setOpen(true);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/group/${id}`);
      setData((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error deleting group: ", error);
    }
  };


  const handleEdit = (id) => {
    const group = data.find((item) => item.id === id);
    setEditingGroup(group);
    openModal();
  };

  return (
    <div>
      <GroupModal
        open={open}
        handleClose={handleClose}
        data={data}
        setData={setData}
        setOpen={setOpen}
        course={course}
        editingGroup={editingGroup} 
      />
      <Button variant="contained" sx={{ marginBottom: "20px" }} onClick={openModal}>
        Add Group
      </Button>
      <GroupTable data={data} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default Group;
