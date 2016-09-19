
$(document).ready(function() {

	$('.smooth').click(function(){
		$('html, body').animate({
			scrollTop: $( $.attr(this, 'href') ).offset().top
		}, 1000);
		return false;
	});
	$('[data-phone="true"]').mask("8 (999) 999-99-99");
	var Form = {
		ValidationOptions: {
			framework: 'bootstrap',
			locale: 'ru_RU',

			/*err: {
				container: function($field,$form){
					return this.$form.find('.messages');
				}
			},*/

			fields: {
				userPhoneNumber: {
					trigger: 'keyup keydown',
					validators: {
						callback: {
							message: 'Это не похоже на телефон!',
							callback: function($field){
								if(/[8]\s[()][0-9]{3}[)]\s[0-9]{3}[-][0-9]{2}[-][0-9]{2}/i.test($field) === true){
									return true;
								} else {
									return false;
								}
							}
						},
						notEmpty: {
							message: 'Это поле не может быть пустым'
						},
						blank: {}
					}
				},

				userEmail: {
					trigger: 'keyup keydown',
					validators: {
						emailAddress: {
							message: 'Это не похоже на e-mail'
						},
						notEmpty: {
							message: 'Это поле не может быть пустым'
						},
						blank: {}
					}
				}
			}
		},

		initialize : function () {
			this.Validation('form');
		},
		Validation:function(form){
			$(form).formValidation(this.ValidationOptions)
			.on('success.form.fv', function(e) {
				window.open('https://www.google.ru/', '_blank');
				e.preventDefault();
				var $form = $(e.target),
				fv = $form.data('formValidation');

				$form.ajaxSubmit({
					success: function(responseText, statusText, xhr, $form) {
						console.log(responseText,statusText,xhr,$form);
					}
				});
			});
		}
	};
	Form.initialize();
	// Does the browser actually support the video element?
	
});

