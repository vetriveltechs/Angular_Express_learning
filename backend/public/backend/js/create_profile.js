$(document).ready(function () {

    
    $('.product_image').on('change', function() {
        const fileInput = this;
        const file = fileInput.files[0];
        const maxSize = 1024 * 1024;
        const maxWidth = 509;
        const maxHeight = 362;

        if (file.size > maxSize) {
            alert('Image size should be no more than 1MB.');
            $('.product_image').val('')
            return;
        }

        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = function() {
            if (img.width > maxWidth || img.height > maxHeight) {
                alert('Image dimensions should be 509px or less in width and 362px or less in height.');
                $('.product_image').val('')
            }
        };

        
        const allowedImageTypes = ['image/xbm','image/tif','image/jfif','image/ico','image/tiff','image/gif','image/svg',
                                    'image/jpeg','image/svgz','image/jpg','image/webp', 'image/png', 'image/bmp','image/pjp',
                                    'image/apng','image/pjpeg','image/avif'];
                                    
        if (!allowedImageTypes.includes(file.type)) {
            alert('Please select an image file.');
            $('.product_image').val('')
        }
    });

    

    $('.numeric-input').on('input', function () {
        var originalValue = $(this).val();
        var newValue = originalValue.replace(/\D/g, '');

        if (originalValue !== newValue) {
            
            alert('Please enter only numeric values.');

            
        }

        $(this).val(newValue);
        });

    // function toggleDropdown(pk) {
    //     var dropdown = $("#myDropdown" + pk);
    //     dropdown.toggle();
    // }

    // $(document).on("click", function (event) {
    //     if (!$(event.target).hasClass('dropdown-btn')) {
    //         $(".dropdown-content").hide();
    //     }
    // });
    
    // var form = $("#myForm");
    // form.validate({
    //     rules: 
    //     {
    //         product_name: 
    //         {
    //             required: true
    //         },
    //         category: 
    //         {
    //             required: true,
    //             min: 1,
    //         },
    //         product_code: 
    //         {
    //             required: true
    //         },
    //         user_name: 
    //         {
    //             required: true
    //         },
    //         password: 
    //         {
    //             required: true
    //         },
    //         url: 
    //         {
    //             required: true
    //         },
    //         description: 
    //         {
    //             required: false // Set to false to make it optional
    //         },
            
    //         image: 
    //         {
    //             required: true
    //         },
    //         country_category: 
    //         {
    //             required: true,
    //             min: 1,
    //         },
            
    //     },
    //     messages: 
    //     {
    //         product_name: 
    //         {
    //             required: 'Please Enter The Product Name'
    //         },
    //         category: 
    //         {
    //             required: 'Please Enter The Category',
    //             min: 'Please choose a Category',
    //         },
    //         product_code: 
    //         {
    //             required: 'Please Enter The Product Code'
    //         },
    //         user_name: 
    //         {
    //             required: 'Please Enter The User Name'
    //         },
    //         password: 
    //         {
    //             required: 'Please Enter The Password'
    //         },
    //         url: 
    //         {
    //             required: 'Please Enter The URL'
    //         },
    //         description: 
    //         {
    //             required: '' // Set an empty string to remove the error message
    //         },
    //         image: 
    //         {
    //             required: 'Please Choose The Image'
    //         },
    //         country_category: 
    //         {
    //             required: 'Please Choose The Country',
    //             min: 'Please Choose The Country'
    //         },
            
    //     },
    //     submitHandler: function () {
    //         form.submit();
    //     }
    // });

   
    
    
});

