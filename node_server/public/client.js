// console.log("Client side is running!");

// const postTestButton = document.getElementById('postTestButton');
// const getTestButton = document.getElementById('getTestButton');
// postTestButton.addEventListener('click', function(e)    {
//     console.log('Button was clicked!');

//     fetch('/posts',   {method: 'POST'})
//         .then(function(res) {
//             if(res.ok)  {
//                 console.log('Click was recorded!');
//                 return;
//             }
//             throw new Error('Request failed!');
//         })
//         .catch(function(error)  {
//             console.log(error);
//         });
// });

// getTestButton.addEventListener('click', function(e)    {
//     console.log('Button was clicked!');

//     fetch('/posts',   {method: 'GET'})
//         .then(function(req) {
//             if(req.ok)  {
//                 console.log('Click got a result!');
//                 return;
//             }
//             throw new Error('Request failed!');
//         })
//         .catch(function(error)  {
//             console.log(error);
//         });
// });