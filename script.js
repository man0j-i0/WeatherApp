
        const searchBtn = document.querySelector("#search");
        const searchInput = document.querySelector("input");
        const temp = document.querySelector(".temperature");
        const Location = document.querySelector(".location");
        const Time = document.querySelector(".time-date");
        const Day = document.querySelector(".day");
        const Image = document.querySelector("#image");
        const Condition = document.querySelector(".condition");

        const searchHandler = async ()=>{
            const location = searchInput.value;
            if(location!=""){
                const data = await fetchData(location);
                temp.textContent = `${data.current.temp_c}`;
                Location.textContent = `${data.location.name}`;
                const localtime = data.location.localtime;
                Time.textContent = localtime;
                const dayOfWeek = getDayOfWeek(data.location.localtime);
                Day.textContent = dayOfWeek;  
                const ImgURl = `https:${data.current.condition.icon}`;
                Image.src=ImgURl;
                Condition.textContent = `${data.current.condition.text}`;
                console.log(data);
                searchInput.value="";
            }else{
                alert("Please input any location first!");
            }
        }

        async function fetchData(location){
            const url = `http://api.weatherapi.com/v1/current.json?key=e71ecd5b7c944ce8a89113024240110&q=${location}&aqi=no`;
            const response = await fetch(url);
            if(response.status==200){
                const data = await response.json();
                return data;
            }else if(response.status==404){
                alert("Data not found!");
            }
        }

        function getDayOfWeek(localtime) {
            const date = new Date(localtime); // Create a Date object
            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            return days[date.getDay()]; // Get the day index and return the corresponding day
        }
        
        searchBtn.addEventListener("click",searchHandler);