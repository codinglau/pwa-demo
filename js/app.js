document.addEventListener("DOMContentLoaded", function() {
    let html5QrCode;
    let cameraStream;
    const nativePhotoGallery = $("#native-photo-gallery");
    const photoGallery = $("#photo-gallery");
    const carouselInner = $("#carousel-inner");

    $("#qrCodeModal").on("shown.bs.modal", function () {
        html5QrCode = new Html5Qrcode("qr-reader");
        html5QrCode.start(
            { facingMode: "environment" }, // Use rear camera
            {
                fps: 10,    // Optional, frame per seconds for qr code scanning
                qrbox: { width: 350, height: 350 },  // Optional, if you want bounded box UI
            },
            qrCodeMessage => {
                // Handle the scanned code as you like
                $("#qr-code-result").val(qrCodeMessage);
                html5QrCode.stop().then(ignore => {
                    $("#qrCodeModal").modal("hide");
                }).catch(err => {
                    console.error("Failed to stop QR code scanner", err);
                });
            },
            errorMessage => {
                // parse error, ignore it.
            })
            .catch(err => {
                // Start failed, handle it.
                console.error("Unable to start QR code scanner", err);
            });
    });

    $("#qrCodeModal").on("hidden.bs.modal", function () {
        if (html5QrCode) {
            html5QrCode.stop().then(() => {
                html5QrCode.clear();
            }).catch(err => {
                console.error("Failed to stop QR code scanner", err);
            });
        }
    });

    function qrCodeSuccess(decodedText, decodedResult) {
        qrCodeResult.value = decodedText;
        html5QrCode.stop().catch(err => {
            console.error(err);
        });
    }

    function qrCodeError(err) {
        console.warn(`QR Code error: ${err}`);
    }

    // Network status handling
    function updateNetworkStatus() {
        const statusText = navigator.onLine ? "Online" : "Offline";
        $("#network-status-text").text(statusText);
    }

    window.addEventListener("online", updateNetworkStatus);
    window.addEventListener("offline", updateNetworkStatus);

    // Initial network status
    updateNetworkStatus();

    // Camera and photo functionality
    $("#native-camera-btn").on("click", function() {
        $("#native-camera-input").trigger("click");
    });

    $("#native-camera-input").on("change", function(event) {
        const files = event.target.files;
        if (files.length > 0) {
            const file = files[0];
            const reader = new FileReader();
            reader.onload = function(e) {
                const photoDataUrl = e.target.result;

                const photoElement = $("<img>").attr("src", photoDataUrl).addClass("img-thumbnail m-2").css("cursor", "pointer");
                photoElement.on("click", function() {
                    const carouselItem = $("<div>").addClass("carousel-item");
                    if (carouselInner.children().length === 0) {
                        carouselItem.addClass("active");
                    }
                    carouselItem.append($("<img>").attr("src", photoDataUrl).addClass("d-block w-100"));
                    carouselInner.append(carouselItem);
                    $("#photoPreviewModal").modal("show");
                });
                nativePhotoGallery.append(photoElement);
            };
            reader.readAsDataURL(file);
        }
    });

    // Camera and photo functionality
    $("#open-camera-btn").on("click", async function() {
        $('#cameraModal').modal('show');
        try {
            cameraStream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
            $("#camera-stream")[0].srcObject = cameraStream;
            $("#camera-stream")[0].play();
        } catch (error) {
            console.error("Error accessing camera: ", error);
        }
    });

    $('#cameraModal').on('hidden.bs.modal', function() {
        if (cameraStream) {
            const tracks = cameraStream.getTracks();
            tracks.forEach(track => track.stop());
            cameraStream = null;
        }
    });

    $("#take-photo-btn").on("click", function() {
        const video = $("#camera-stream")[0];
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const context = canvas.getContext("2d");
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const photoDataUrl = canvas.toDataURL("image/png");

        const photoElement = $("<img>").attr("src", photoDataUrl).addClass("img-thumbnail m-2").css("cursor", "pointer");
        photoElement.on("click", function() {
            const carouselItem = $("<div>").addClass("carousel-item");
            if (carouselInner.children().length === 0) {
                carouselItem.addClass("active");
            }
            carouselItem.append($("<img>").attr("src", photoDataUrl).addClass("d-block w-100"));
            carouselInner.append(carouselItem);
            $("#photoPreviewModal").modal("show");
        });
        photoGallery.append(photoElement);
    });
});