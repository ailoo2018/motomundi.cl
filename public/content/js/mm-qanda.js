/*
if ("undefined" != typeof app) {
    var app = angular.module("mm", ["infinite-scroll", "ngCookies"]);
}
*/

// Service: Product Questions and Answers
angular.module("mm").service('productQuestionAndAnswerService', function ($rootScope, $http, $log) {

    var config = {headers: {'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8;'}};

    this.getQuestionsAndAnswers = function (productId, callback) {
        $http.get(`/AjaxQuestionAndAnswer/ListQuestions.rails?productId=${productId}`)
            .then(function (resp) {
                callback.success(resp);
            })
            .catch(function (error) {
                if (callback.error) {
                    callback.error(error);
                }
            });
    };

    this.addQuestion = function (productId, comment, callback) {
        if ("undefined" != typeof productId && "undefined" != typeof comment) {
            $http.post("/AjaxQuestionAndAnswer/AddComment.rails", {ProductId: productId, Comment: comment}, config)
                .then(function (resp) {
                    callback.success(resp);
                })
                .catch(function (error) {
                    if (callback.error) {
                        callback.error(error);
                    }
                });
        } else {
            $log.info("addQuestion: invalid input");
        }
    };

    this.addAnswer = function (productId, comment, questionId, callback) {
        if ("undefined" != typeof questionId && "undefined" != typeof comment) {
            $http.post("/AjaxQuestionAndAnswer/AddComment.rails", {ProductId: productId, Comment: comment, ParentId: questionId}, config)
                .then(function (resp) {
                    callback.success(resp);
                })
                .catch(function (error) {
                    if (callback.error) {
                        callback.error(error);
                    }
                });
        } else {
            $log.info("addAnswer: invalid input");
        }
    };

    this.addFeedback = function (id, feedback, callback) {
        if ("undefined" != typeof id && "undefined" != typeof feedback) {
            $http.post("/AjaxQuestionAndAnswer/AddFeedback.rails", {QuestionId: id, Feedback: feedback}, config)
                .then(function (resp) {
                    callback.success(resp);
                })
                .catch(function (error) {
                    if (callback.error) {
                        callback.error(error);
                    }
                });
        } else {
            $log.info("addFeedback: invalid input");
        }
    };
});

// Controller: Product Questions and Answers
angular.module("mm").controller("ProductQuestionAndAnswerController", function ($scope, $rootScope, $uibModal, $log, $cookieStore, productQuestionAndAnswerService) {
    $scope.debugMode = false;
    $log.info("ProductQuestionAndAnswerController [debug mode: " + ($scope.debugMode ? "on]" : "off]"));

    $scope.productQuestionAnswers = [];

    // Carga listado de preguntas y respuestas asociadas al producto deplegado en pantalla
    var init = function (e) {
        // Informacion del producto, obtenida desde vista Product/View2.vm
        $scope.productId = document.getElementById("productId").value;

        // Preguntas y respuestas
        getQuestionsAndAnswers();

        // Variables de control para respuestas a preguntas
        $scope.showAnswerForm = [];

        $scope.productQuestion = '';
        $scope.feedbackCookie = getFeedbackCookie();
    };

    var getFeedbackCookie = function () {
        return $cookieStore.get("FeedbackQuestionAndAnswer") ?? [];
    }

    var getQuestionsAndAnswers = function() {
        productQuestionAndAnswerService.getQuestionsAndAnswers($scope.productId, {
            success: function (resp) {
                $scope.productQuestions = resp.data.questions;

                angular.forEach($scope.productQuestions, function(value, key) {
                    $scope.productQuestionAnswers[value.id] = '';
                });
            }
        });
    }

    // Feedback status from cookie
    $scope.getFeedbackStatus = function (questionId) {
        var cookieIndex = $scope.feedbackCookie.findIndex(item => item.QuestionId === questionId);
        if (cookieIndex > -1) {
            if ($scope.feedbackCookie[cookieIndex].IsLike === true) {
                return "LIKED";
            } else {
                return "DISLIKED";
            }
        } else {
            return "NORMAL";
        }
    }

    // Singin antes de preguntar o responder
    var signinModal = function () {
        var modalInstance = $uibModal.open({
            animation: false,
            templateUrl: '/Templates/MotoMundiDesktop/Content/js/SigninModal.html',
            controller: 'SigninController',
            // controllerAs: 'ProductQuestionAndAnswerController',
            windowClass: 'desktop-signin-modal',
            // scope: $scope,
            keyboard: true,
            size: 'md',
            resolve: {
                data: function () {
                    return self.data;
                }
            }
        })
        // Respuesta de modal signin
        modalInstance.result.then(function () {
              // Context: Login exitoso
            location.reload();
        }, function () {
            // Context: Modal cerrado
            if ($scope.debugMode) $log.info('Modal dismissed at: ' + new Date());
        });
    };

    // Envia una pregunta
    $scope.sendQuestion = function () {
        if ($scope.debugMode) $log.info('SendQuestion');
        productQuestionAndAnswerService.addQuestion($scope.productId, $scope.productQuestion, {
            success: function (resp) {
                $scope.productQuestion = "";
                $scope.productQuestions.unshift(resp.data);
            },
            error: function (resp) {
                if (resp.status === 401) {
                    signinModal();
                    if ($scope.debugMode) $log.info('Debe iniciar sesion para hacer preguntas');
                }
            }
        });
    }

    // Envia respuesta si el usuario ya inicio sesion, caso contrario carga formulario signin
    $scope.sendAnswer = function (questionId) {
        if ($scope.debugMode) $log.info('SendAnswer');
        productQuestionAndAnswerService.addAnswer($scope.productId, $scope.productQuestionAnswers[questionId], questionId, {
            success: function (resp) {
                // Servicio responde con listado de preguntas/respuestas actualizado.
                $scope.productQuestionAnswers[questionId] = "";
                var idx = $scope.productQuestions.findIndex(item => item.id === resp.data.ParentId);
                $scope.productQuestions[idx].Answers.unshift(resp.data);
                $scope.hideAnswerForm(null, questionId);
            },
            error: function (resp) {
                if (resp.status === 401) {
                    if ($scope.debugMode) $log.info('Debe iniciar sesion para hacer responder a una pregunta');
                    signinModal();
                }
            }
        });
    }

    // Like/Dislikes para preguntas
    $scope.sendFeedback = function (event, comment, feedback) {
        // comment = question o answer
        productQuestionAndAnswerService.addFeedback(comment.id, feedback, {
            success: function (resp) {
                comment.Likes = resp.data.Likes;
                comment.Dislikes = resp.data.Dislikes;
                $scope.feedbackCookie = getFeedbackCookie();
            },
            error: function (resp) {
                if (resp.status === 401) {
                    if ($scope.debugMode) $log.info('Debe iniciar sesion para enviar feedback de preguntas y respuestas');
                    signinModal();
                }
            }
        });
    };

    // Muestra cuadro de texto para respuesta a una pregunta
    $scope.openAnswerTextbox = function (event, questionId) {
        $scope.showAnswerForm[questionId] = !0;
        $scope.answerTextboxIsVisible = !0;
    };

    // Oculta cuadro de texto para respuesta a una pregunta
    $scope.hideAnswerForm = function (event, questionId) {
        $scope.showAnswerForm[questionId] = !1;
        $scope.answerTextboxIsVisible = !1;
    };

    init();
});
