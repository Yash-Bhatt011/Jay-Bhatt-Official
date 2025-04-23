$(document).ready(function(){
    "use strict";
    
    var form = $('#contactForm');
    
    form.on('submit', function(e) {
        e.preventDefault();
        
        // Reset previous error states
        form.find('.is-invalid').removeClass('is-invalid');
        
        // Validate required fields
        var valid = true;
        var formData = new FormData(this);
        
        // Basic validation
        form.find('[required]').each(function() {
            if (!$(this).val().trim()) {
                $(this).addClass('is-invalid');
                valid = false;
            }
        });
        
        // Email validation
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test($('#email').val())) {
            $('#email').addClass('is-invalid');
            valid = false;
        }
        
        // Phone validation
        var phoneRegex = /^\d{10}$/;
        if (!phoneRegex.test($('#number').val())) {
            $('#number').addClass('is-invalid');
            valid = false;
        }
        
        if (!valid) {
            return false;
        }
        
        // Submit form
        $.ajax({
            type: "POST",
            url: form.attr('action'),
            data: form.serialize(),
            dataType: 'json',
            success: function(response) {
                if (response.status === 'success') {
                    // Open WhatsApp
                    window.open(response.redirect_url, '_blank');
                    
                    // Reset form
                    form[0].reset();
                    
                    // Show success message
                    alert('તમારો સંદેશ સફળતાપૂર્વક મોકલવામાં આવ્યો છે!');
                } else {
                    alert('Error: ' + response.message);
                }
            },
            error: function() {
                alert('કૃપા કરી થોડી વાર પછી ફરી પ્રયાસ કરો.');
            }
        });
    });
});
