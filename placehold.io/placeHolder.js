const select = document.querySelector('select');
        const inputAll = document.querySelectorAll('input');
        const myImg = document.querySelector('img');
        const textArea = document.querySelector('textarea');

        let urlObj = {};

        const removeHash = (str) => str.replace("#", "");

        const createImgPath = () => {
            myImg.src = "https://via.placeholder.com/150/CCCCCC/000000?text=Loading...";

            urlObj.size = select.value || "150x50";
            urlObj.text =inputAll[0].value.trim() || "Placeholder";
            urlObj.bgClr = removeHash(inputAll[1].value) || "CCCCCC";
            urlObj.txtClr = removeHash(inputAll[2].value) || "000000";

            if (!/^\d+x\d+$/.test(urlObj.size)) {
                Swal.fire({
                    title: "Invalid Size",
                    text: "Please select a valid size from the dropdown.",
                    icon: "warning",
                    background: "#212121",
                    color: "white",
                    confirmButtonColor: "#00ADB5",
                });
                return;
            }

            const [width, height] = urlObj.size.split("x").map(Number);
            if (width > 1920 || height > 1080) {
                Swal.fire({
                    title: "Size Too Large",
                    text: "The selected size is too large. Defaulting to Full HD (1920x1080).",
                    icon: "warning",
                    background: "#212121",
                    color: "white",
                    confirmButtonColor: "#00ADB5",
                });
                urlObj.size = "1920x1080";
            }

            let urlPath = `https://placehold.co/${urlObj.size}/${urlObj.bgClr}/${urlObj.txtClr}?text=${encodeURIComponent(urlObj.text)}`;
            setTimeout(() => {
                myImg.src = urlPath;
                textArea.value = urlPath;
            }, 500);
        };

        const copyToClipboard = () => {
            textArea.select();
            document.execCommand("copy");
            Swal.fire({
                title: "Copied to Clipboard!",
                text: "URL has been copied.",
                icon: "success",
                background: "#212121",
                color: "white",
                confirmButtonColor: "#00ADB5",
                backdrop: `
            rgba(0, 0, 0, 0.8) 
            left top
            no-repeat
        `,
                allowOutsideClick: true, // Keeps the page static
                heightAuto: false, // Prevents SweetAlert from adjusting to page height
            });
        };


        inputAll.forEach((elem) => {
            elem.addEventListener('change', createImgPath);
        });
        select.addEventListener('change', createImgPath);

        // Add click event to textarea for copying URL
        textArea.addEventListener('click', copyToClipboard);

