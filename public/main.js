

const delBtn = document.querySelectorAll("#delBtn");

delBtn.forEach((btn)=>{
    btn.addEventListener("click",(e)=>{
        const userid = e.target.getAttribute("data-userId");
        fetch(`/delete/${userid}`,{
            method: "DELETE",
        }).then((res) => res.json())
        .then((data) => {
          console.log(data);
          location.reload();
        })
        .catch(error => console.error(error));
    })
})





