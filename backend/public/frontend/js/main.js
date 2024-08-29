
function capitalizeInput(inputElement) {
    inputElement.value = inputElement.value.charAt(0).toUpperCase() + inputElement.value.slice(1);
  }
  
  
  $('.edit-link').click(function(e) {
    e.preventDefault();
    var editUrl = $(this).attr('href');
    // Do something with the editUrl, like open a modal, etc.
  });
  
  $('.delete-link').click(function(e) {
    e.preventDefault();
    var deleteUrl = $(this).attr('href');
    // Do something with the deleteUrl, like open a confirmation modal, etc.
  });
  
  
  $(document).ready(function () {
      jQuery.validator.addMethod("email_regex", function (value, element) 
      {
          return /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,3})+$/.test(value);
      }, "Please enter a valid email address!");
  
      jQuery.validator.addMethod("phone_regex", function (value, element) 
      {
          return this.optional(element) || /^[0-9\.\-_]{10,30}$/i.test(value);
      }, "Phone Number with only 0-9. Minlength: 10");
  });
  
  function onlyNumberKey(evt) {
  
    // Only ASCII character in that range allowed
    var ASCIICode = (evt.which) ? evt.which : evt.keyCode
    if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
        return false;
  
    return true;
  }
  
  
  
  $("#fromdate, #todate").keydown(function (event) {
  
    event.preventDefault();
  });
  
  
  function updateToDateMin() {
    const fromDateInput = document.getElementById("fromdate");
  
    const toDateInput = document.getElementById("todate");
    
    const fromDate = new Date(fromDateInput.value);
    fromDate.setDate(fromDate.getDate()); 
    
    const toDate = new Date(toDateInput.value);
    
    
    if (toDate < fromDate) {
        toDateInput.value = ""; 
    }
    
    toDateInput.min = fromDate.toISOString().split('T')[0];
  }
  
  $(document).ready(function () {
      var form = $("#myform");
      form.validate(
      {
          rules: {
              employeecode:
              {
                  required: true
              },
  
              employeename:
              {
                  required: true
              },
  
              employeectc:
              {
                  required: true
              },
  
              fromdate:
              {
                  required: true
              },
  
              todate:
              {
                  required: true
              },
  
              livingcity:
              {
                  required: true
              },
  
              place:
              {
                  required: true
              },
              drops0: {
                  required: true, 
                  
                  
              },
              quantity0: {
                  required: true
              },
              drops1: {
                  required: true, 
                  
              },
              quantity1: {
                  required: true
              },
              drops2: {
                  required: true, 
                  
              },
              quantity2: {
                  required: true
              },
              drops3: {
                  required: true, 
                  
              },
              quantity3: {
                  required: true
              },
              '.quantity': {
                  required: true
              },
  
  
  
          },
  
          messages: {
  
              employeecode:
              {
                  required: 'Please Enter the Employee Code'
              },
  
              employeename:
              {
                  required: 'Please Enter The Employee Name'
              },
  
              employeectc:
              {
                  required: 'Please Enter the Employee CTC'
              },
  
              fromdate:
              {
                  required: 'Please select The From Date'
              },
  
              todate:
              {
                  required: 'Please Select The To Date'
              },
  
              livingcity:
              {
                  required: 'Please Enter The Living City'
              },
  
              place:
              {
                  required: 'Please Enter The Place'
              },
              drops0: {
                  required: 'Please select Your Monthly Activity',
                  
              },
              quantity0: {
                  required: 'Please Enter the Price'
              },
              drops1: {
                  required: 'Please select Your Monthly Activity'
              },
              quantity1: {
                  required: 'Please Enter the Price'
              },
              drops2: {
                  required: 'Please select Your Monthly Activity'
              },
              quantity2: {
                  required: 'Please Enter the Price'
              },
              drops3: {
                  required: 'Please select Your Monthly Activity'
              },
              quantity3: {
                  required: 'Please Enter the Price'
              },
              '.quantity': {
                  required: 'Please Enter the Price'
              },
  
  
          },
          submitHandler: function () {
              form.submit();
  
          }
      });
      $('#btn2').click(function () {
    
          if (form.valid() == true) {
        
              alert('Success')
        
              $('#btn1').attr('disabled', false)
        
        
          }
          else {
        
              alert('Not success')
        
          }
        
        });
  });
  
  
  $("#productTable").on("input", "input[type='number']", function () {
    updateSubtotal();
    maintotal()
  });
  
  
  var i = 1;
  var selectedItems = [];
  
  // jQuery.validator.addMethod("uniqueDropDown", function(value, element) {
  //     return selectedItems.indexOf(value) === -1;
  // }, "This option has already been selected.");
  
  // Attach the change event to the dropdown class (since you have multiple dropdowns)
  var i = 1;
  
  
  var selectedItems = [];
  
  
  // jQuery.validator.addMethod("uniqueDropDown", function(value, element) {
  //     return selectedItems.indexOf(value) === -1;
  // }, "This option has already been selected.");
  
  // $('#btn1').prop('disabled',true)
  
  $(".form-check-input").change(function () {
    var checkbox = this;
    var employeeID = $(this).data("employeeid");
    var activeStatus = this.checked ? 1 : 0;
  
    // Send the updated active status to the server using an AJAX request
    $.ajax({
        url: "showdata.php", // Replace with the correct PHP script to update the active status
        method: "POST",
        data: { employeeID: employeeID, activeStatus: activeStatus },
        success: function (response) {
            // Update the label text based on the new activeStatus value
            var labelText = activeStatus === 1 ? 'Active' : 'Inactive';
            $(checkbox).next('label').text(labelText);
        }
    });
  });
  
  $('.toggle-activestatus').click(function() {
    var employeeId = $(this).data('employee-id');
    var currentStatus = $(this).data('current-status');
    var newStatus = $(this).data('new-status');
    
    $.ajax({
        type: 'POST',
        url: 'update_activestatus.php', // Path to your PHP script
        data: {
            employeeId: employeeId,
            newStatus: newStatus
        },
        success: function(response) {
            if (response === 'success') {
                var newButtonText = newStatus === 1 ? 'Active' : 'Inactive';
                var newButtonClass = newStatus === 1 ? 'btn-success' : 'btn-danger';
                $(this).text(newButtonText).removeClass('btn-success btn-danger').addClass(newButtonClass);
                $(this).data('current-status', newStatus);
            } else {
                alert('Status update failed.');
            }
        }.bind(this) // Maintain the context of the clicked button within the callback
    });
  });
  
  $('.btn-toggle-activestatus').click(function() {
    var employeeId = $(this).data('employee-id');
    var currentStatus = $(this).data('activestatus');
    var newStatus = currentStatus === 1 ? 0 : 1;
    
    $.ajax({
        type: 'POST',
        url: 'showdata.php', // Path to your PHP script
        data: {
            employeeId: employeeId,
            newStatus: newStatus
        },
        success: function(response) {
            if (response === 'success') {
                var newButtonText = newStatus === 1 ? 'Active' : 'Inactive';
                $(this).text(newButtonText);
                $(this).data('activestatus', newStatus);
            } else {
                alert('Status update failed.');
            }
        }.bind(this) // Maintain the context of the clicked button within the callback
    });
  });
  
  
  $('#btn1').prop('disabled', false);
  
  $(document).on('change', '.drops', function () {
    var selectedItem = $(this).val();
    
    if ((selectedItems.includes(selectedItem))) {
        $('#error-message').show();
        $(this).val('');
        $('#btn1').prop('disabled', true);
        return; // Prevent adding row if item is not unique
    } else {
        $('#error-message').hide();
        $('#btn1').prop('disabled', false);
    }
  });
  
  function addbutton(selectedItem) {
   
            
    if (!selectedItems.includes(selectedItem)) {
        var ro = `<tr id='row-${i}'>
                <td>
                    <select id='drops${i}' name='drops${i}' class='form-control drops'>
                    <option value='' class='form-control'>Select Your Monthly Activity</option>
                    <option value='Food' class='form-control'>Food</option>
                    <option value='Medicine' class='form-control'>Medicine</option>
                    <option value='Petrol' class='form-control'>Petrol</option>
                    <option value='Recharge' class='form-control'>Recharge</option>
                    </select>
  
                    <div id="dropdown-message${i}" style="display: none; color: red;">Select The drop down down</div>
  
                </td>
                <td>
                    <input type="number" class="form-control quantity" name="quantity${i}" id="quantity${i}" placeholder="0.00" min="0">
                
                    <div id="quantity-message${i}" style="display: none; color: red;">Select The quantity</div>
                    
                </td>
                <td>
                    <label type="text" class="form-control total" name="total${i}" id="total${i}" disabled>0.00</label>
                </td>
            </tr>`;
            
        var newRow = $(ro);
        if(i<4){
            $('tbody').append(newRow);
            selectedItems.push(selectedItem);
            
        }
        else{
            alert()
  
            $('#error-message').html('All Item are selected');
            $('#error-message').show();
  
            $('#btn1').prop('disabled', true);
  
        }
        i++;
    } else {
        alert('This item has already been selected.');
    }
  }
  
  $('#btn1').on('click', function () {
    var selectedItem = $(`#drops${i-1}`).val();
  
    if($(`#drops${i-1}`).val()!='' ){
        
        $(`#dropdown-message${i-1}`).hide()
  
        if($(`#quantity${i-1}`).val()!=''){
  
            $(`#quantity-message${i-1}`).hide();
  
            addbutton(selectedItem)
        }
        else{
            $(`#quantity-message${i-1}`).show()
  
            $(`#quantity${i-1}`).keydown(function (e) { 
                $(`#quantity-message${i-1}`).hide();
                
            });
        }
        
    }
    else{
        $(`#dropdown-message${i-1}`).show()
        $(`#drops${i-1}`).change(function (e) { 
            $(`#dropdown-message${i-1}`).hide()
  
            
        });
  
    }
  
  });
  
  
  
  
  function updateSubtotal() {
    $("#productTable tbody tr").each(function (i, element) {
  
        var qty = $(this).find('.quantity').val()
  
        sel = Number(qty * 12)
  
        $(this).find('.total').html(sel)
  
        $('#hidden0').val(sel)
  
  
  
    })
  }
  
  function maintotal() {
  
    let totalPrice = 0
  
    $("#productTable tbody tr").each(function () {
        var priceText = $(this).find("td:eq(2)").text();
  
        var price = parseFloat(priceText.substring(1));
  
        totalPrice += price;
    });
  
    $("#totalPrice").text(totalPrice.toFixed(2));
  
    // $('#hidden0').val(totalPrice.toFixed(2))
  
    checksubmit(Number(totalPrice.toFixed(2)), Number($('#employeectc').val()))
  }
  
  $('#employeectc').on('input', function () {
    maintotal();
  });
  
  
  
  
  
  