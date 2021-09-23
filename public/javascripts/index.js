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
          const newTextArea = document.createElement('textarea');
          const storyId = event.target.dataset.storyId;
          newTextArea.innerText = userInput;
          commentList.appendChild(newTextArea);
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

          editBtn.addEventListener("click", async (event) => {
            editBtn.hidden= true
            deleteBtn.hidden= true
            editCancelBtn.hidden= false
            editSubmitBtn.hidden= false
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
          
          
          
          

          newTextArea.appendChild(editBtn);
          newTextArea.appendChild(deleteBtn);
          newTextArea.appendChild(editCancelBtn);
          editCancelBtn.hidden= true
          newTextArea.appendChild(editSubmitBtn);
          editSubmitBtn.hidden= true
          

        } catch (e) {
            console.log("Failed to fetch comments", e);
        }
        });
      }
    })
    