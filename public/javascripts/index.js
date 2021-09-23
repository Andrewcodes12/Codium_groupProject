window.addEventListener("DOMContentLoaded", async (event) =>{
    const commentList = document.querySelector('.commentList')
    const commentBtn = document.querySelector('#submitBtn')


    if (commentBtn) {
      commentBtn.addEventListener("click", async event => {

          // if(){

          // }
          const _csrf = document.querySelector('#token').value;
          event.preventDefault();
          const userInput = document.querySelector('.form-control').value
          document.querySelector('.form-control').value = '';
          const newDivArea = document.createElement('div');
          const storyId = event.target.dataset.storyId;
          newDivArea.innerText = userInput;
          newDivArea.classList.add('commentContent')
          const body = { body: userInput, _csrf }





            try {
                const commentResponse = await fetch(`/stories/${storyId}/comments`, {
                  method: "POST",
                  body: JSON.stringify(body),
                  headers: { "Content-Type": "application/json" },
                });

                // Converts to JSON
                const commentData = await commentResponse.json();
                console.log(commentData, 'this was logged')


                const {
                  id,
                  userId,
                  firstName,
                  updatedAt,
                } = commentData

          const editBtn = document.createElement('button');
          editBtn.setAttribute('value', id)
          editBtn.className += `editBtn-${id}`;
          editBtn.className += 'btn';
          editBtn.className += 'editBtn';
          editBtn.innerText = 'Edit'

          const commentContentNotADiv = document.querySelector(".commentContent")
          editBtn.addEventListener("click", async (event) => {
            editBtn.hidden= true
            deleteBtn.hidden= true
            editCancelBtn.hidden= false
            editSubmitBtn.hidden= false
            commentContentNotADiv.setAttribute("contenteditable","true")
          })


          const deleteBtn = document.createElement('button');
          deleteBtn.setAttribute('value', id)
          deleteBtn.className += `deleteBtn-${id}`;
          deleteBtn.className += 'btn';
          deleteBtn.className += 'deleteBtn';
          deleteBtn.innerText = 'Delete'

          deleteBtn.addEventListener("click", async (event) => {
            editBtn.hidden= true
            deleteBtn.hidden= true
            editCancelBtn.hidden= false
            editSubmitBtn.hidden= false
          })
          //--------------------------------------------------------------------
          const commentUserInfo = document.createElement("div")
          commentUserInfo.classList.add('commentUserInfo')
          commentUserInfo.appendChild(newDivArea)

          const commentButtons = document.createElement("div")
          commentButtons.classList.add('commentButtons');

          const commentContent = document.createElement("div")
          commentContent.classList.add('commentContent');

          commentButtons.appendChild(commentContent);
          commentList.appendChild(commentContent)
          //---------------------------------------------------------------------
          const editCancelBtn = document.createElement('button');
          editCancelBtn.setAttribute('value', id)
          editCancelBtn.className += `editCancelBtn-${id}`;
          editCancelBtn.className += 'btn';
          editCancelBtn.className += 'editCancelBtn';
          editCancelBtn.innerText = 'Cancel'

          editCancelBtn.addEventListener("click", async (event) => {
            editBtn.hidden= false
            deleteBtn.hidden= false
            editCancelBtn.hidden= true
            editSubmitBtn.hidden= true
          })


          const editSubmitBtn = document.createElement('button');
          editSubmitBtn.setAttribute('value', id)
          editSubmitBtn.className += `editSubmitBtn-${id}`;
          editSubmitBtn.className += 'btn';
          editSubmitBtn.className += 'editSubmitBtn';
          editSubmitBtn.innerText = 'Submit'

          editSubmitBtn.addEventListener("click", async (event) => {
            editBtn.hidden= false
            deleteBtn.hidden= false
            editCancelBtn.hidden= true
            editSubmitBtn.hidden= true
          })





          // newDivArea.appendChild(editBtn);
          // newDivArea.appendChild(deleteBtn);
          // newDivArea.appendChild(editCancelBtn);
          // editCancelBtn.hidden= true
          // newDivArea.appendChild(editSubmitBtn);
          // editSubmitBtn.hidden= true

          commentButtons.appendChild(editBtn);
          commentButtons.appendChild(deleteBtn);
          commentButtons.appendChild(editCancelBtn);
          editCancelBtn.hidden= true
          commentButtons.appendChild(editSubmitBtn);
          editSubmitBtn.hidden= true

        } catch (e) {
          console.log("Failed to fetch comments", e);
        }
      });
    }
  })
