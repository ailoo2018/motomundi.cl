// Service: Inicio de sesion de usuarios
angular.module("mm").service('SigninService', function  ($http) {
    var config = {headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}};

    this.login = function (email, password, callback) {
        return $http.post("/Ajax/Login.rails", { email: email, password: password, keepSession: !0 }, config)
            .then(function (response) {
                callback.success(response);
            })
            .catch(function (error) {
                if (callback.error) {
                    callback.error(error);
                }
            });
    }
    this.googleLogin = function (authCode, callback) {
        return $http.get("/Ajax/DoGoogleLogin.rails?authCode=" + authCode, {}, config)
            .then(function (res) {
                callback.success(res);
            })
            .catch(function (e) {
                if (callback.error) {
                    callback.error(e);
                }
            });
    }
    this.facebookLogin = function (authCode, callback) {
        return $http.get("/Ajax/DoFacebookLogin.rails?authCode=" + authCode, {}, config)
            .then(function (res) {
                callback.success(res);
            })
            .catch(function (e) {
                if (callback.error) {
                    callback.error(e);
                }
            });
    }
});

// Controlador: Inicio de sesion de usuarios
angular.module("mm").controller("SigninController", function ($scope, $rootScope, SigninService, $log, $uibModalInstance) {
    $scope.debugMode = false;
    $log.info('SigninController [debug mode: ' + ($scope.debugMode ? "on]" : "off]"));
    $scope.signinForm = {};
    $scope.signinForm.errorMessage = "NO ERRORS";
   
    // Validaciones de input en username y password
    submitFormValidation = function () {
    };

    $scope.login = function () {
        if ($scope.debugMode) $log.info('SigninController > login');
        SigninService.login($scope.signinForm.username, $scope.signinForm.password, {
            success: function (resp) {
                $uibModalInstance.dismiss();
            },
            error: function (resp) {
                $scope.authError = resp.data.error;
                if ($scope.debugMode) $log.error('error: ' + resp.data.error);
                if ($scope.debugMode) $log.error('code: ' + resp.data.code);
                // $scope.loading = false;
                $scope.signinForm.errorMessage = resp.data.error;
            }
        });
    }
    $scope.loginGoogle = function() {
        auth2.grantOfflineAccess().then(googleSignCallback);
    }
    $scope.loginFacebook = function() {
        FB.login(function (res) {
            if (res.authResponse.accessToken) {
                SigninService.facebookLogin(res.authResponse.accessToken, {
                    success: function (res) {
                        $uibModalInstance.dismiss();
                    },
                    error: function (e) {
                        $scope.authError = e.data.error;
                        if ($scope.debugMode) {
                            $log.error('error: ' + e.data.error);
                            $log.error('code: ' + e.data.code);
                        }
                        $scope.signinForm.errorMessage = e.data.error;
                    }
                });
            } else {
                // There was an error.
            }
        }, { scope: 'email' });
    }
    function googleSignCallback (authResult) {
        if (authResult['code']) {
            SigninService.googleLogin(authResult['code'], {
                success: function (res) {
                    $uibModalInstance.dismiss();
                },
                error: function (e) {
                    $scope.authError = e.data.error;
                    if ($scope.debugMode) {
                        $log.error('error: ' + e.data.error);
                        $log.error('code: ' + e.data.code);
                    }
                    $scope.signinForm.errorMessage = e.data.error;
                }
            });
        } else {
            $scope.errorMessage = "Error al hacer login";
        }
    }
});
