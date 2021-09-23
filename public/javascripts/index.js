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
          const newTextArea = document.createElement('p');
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

            } catch (e) {
                console.log("Failed to fetch comments", e);
            }


          const editBtn = document.createElement('button');
          const deleteBtn = document.createElement('button');
          const editCancelBtn = document.createElement('button');
          const editSubmitBtn = document.createElement('button');
          editBtn.classList.add('editBtn');
          editBtn.innerText = 'Edit'

          deleteBtn.classList.add('deleteBtn');
          deleteBtn.innerText = 'Delete'

          editCancelBtn.classList.add('editCancelBtn');
          editCancelBtn.innerText = 'Cancel'

          editSubmitBtn.classList.add('editSubmitBtn');
          editSubmitBtn.innerText = 'Submit'

          newTextArea.appendChild(editBtn);
          newTextArea.appendChild(deleteBtn);
          newTextArea.appendChild(editCancelBtn);
          editCancelBtn.hidden= true
          newTextArea.appendChild(editSubmitBtn);
          editSubmitBtn.hidden= true

          const editButton= document.querySelector(`.editBtn editBtn-${comment.id} btn`)
          editButton.addEventListener("click", async (event) => {
            editBtn.hidden= true
            deleteBtn.hidden= true
            editCancelBtn.hidden= false
            editSubmitBtn.hidden= false
            console.log("this works")
          })

        });
      }
    })
