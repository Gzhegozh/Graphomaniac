class User::RegistrationsController < Devise::RegistrationsController
  before_filter :sign_up_params, only: [:create]
  before_filter :configure_permitted_parameters

   private
    def sign_up_params
     params.require(:user).permit(:name, :alias, :role, :email, :password, :password_confirmation, :avatar)
    end

    def configure_permitted_parameters
      devise_parameter_sanitizer.for(:account_update).push(:avatar)
    end

     # def account_update_params
     #   params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation, :current_password)
     # end

   public
  # GET /resource/sign_up
   def new
     super
   end

  # POST /resource
  def create
    super
  end

  # GET /resource/edit
  def edit
    super
  end

  # PUT /resource
  def update
    super
  end

  # DELETE /resource
  def destroy
    super
  end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  def cancel
    super
  end

end
