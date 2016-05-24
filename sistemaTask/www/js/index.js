angular.module('appAlianca', ['ionic'])

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider ) {

  $stateProvider
    .state('modulo', {
      url: "/modulo",
      abstract: true,
      templateUrl: "templates/home.html"
    })
    .state('modulo.admin', {
      url: "/admin",
      abstract: true,
      views: {
        'menuContent': {
          templateUrl: "templates/modulo/admin/tabs.html"
        }
      }
    })
    .state('modulo.admin.aluno', {
      url: "/aluno",
      views: {
        'tab-aluno': {
          templateUrl: "templates/modulo/admin/tab.aluno.html",
          controller: 'AlunoCtrl'
        }
      }
    })
    .state('modulo.admin.curso', {
      url: "/curso",
      views: {
        'tab-curso': {
          templateUrl: "templates/modulo/admin/tab.curso.html",
          controller: 'CursoCtrl'
        }
      }
    })
    .state('modulo.admin.turma', {
      url: "/turma",
      views: {
        'tab-turma': {
          templateUrl: "templates/modulo/admin/tab.turma.html",
          controller: 'TurmaCtrl'
        }
      }
    })
    .state('modulo.professor', {
      url: "/professor",
      abstract: true,
      views: {
        'menuContent': {
          templateUrl: "templates/modulo/professor/tabs.html"
        }
      }
    })
    .state('modulo.professor.chamada', {
      url: "/chamada",
      views: {
        'tab-chamada': {
          templateUrl: "templates/modulo/professor/tab.chamada.html",
          controller: 'chamadaCtrl'
        }
      }
    })
    .state('modulo.professor.calendario', {
      url: "/calendario",
      views: {
        'tab-calendario': {
          templateUrl: "templates/modulo/professor/tab.calendario.html",
          controller: 'calendarioCtrl'
        }
      }
    })
    .state('modulo.sobre', {
      url: "/sobre",
      views: {
        'menuContent': {
          templateUrl: "templates/sobre.html"
        }
      }
    });

   $urlRouterProvider.otherwise("/modulo/professor/chamada");

})

.controller('MainCtrl', function($scope, $ionicSideMenuDelegate) {
  console.log('MainCtrl');

  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };
})

.controller('AlunoCtrl', function($scope, $ionicModal, $ionicListDelegate) {

  $scope.entity = {};

  $scope.alunos = [
    { pk:1, nome: 'Michael Lins', email: 'michael@lins', aniversario: '12/10' },
    { pk:2, nome: 'Dani Lins', email: 'dani@lins', aniversario: '16/09' },
    { pk:3, nome: 'Rebeca Lins', email: 'rebeca@lins', aniversario: '30/12' },
    { pk:4, nome: 'Sara Lins', email: 'sara@lins', aniversario: '20/09' },
  ];

  $ionicModal.fromTemplateUrl('templates/modulo/admin/tab.aluno.cadastro.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function( entity ) {

    $ionicListDelegate.closeOptionButtons();

    if ( entity )
    {
      console.log( entity );
      $scope.entity = angular.copy(entity);
      console.log( $scope.entity );
    }
    else
    {
      $scope.entity = {};
    }
    $scope.modal.show();
  }

  $scope.newPk = function() {
      return $scope.alunos.length;
  }

  $scope.salvar = function(u) {
    console.log(u);
    var found = $scope.alunos.find( function(aluno){ return aluno.pk == u.pk } );//_id
    if ( !found )
      $scope.alunos.push({ pk: $scope.newPk(), nome: u.nome, email: u.email, aniversario: u.aniversario });
    else {
      found.nome = u.nome;
      found.email = u.email;
      found.aniversario = u.aniversario;
    }

    // console.log( JSON.stringify($scope.alunos) );
    console.log( found );

    $scope.closeModal();
  };

  $scope.listDelete = function(entity) {
    var i = $scope.alunos.indexOf(entity);
    if ( i >= 0 ) {
      $scope.alunos.splice( i, 1 );
      console.log( entity );
    }
  }


  $scope.closeModal = function() {
    $scope.modal.hide();
    $scope.entity = {};

  }

  $scope.editar = function(u) {
    $entity = u;
  }
})

.controller('CursoCtrl', function($scope, $ionicModal) {

  $scope.cursos = [
    { nome: 'Curso A' ,nome: 'Curso A'},
    { nome: 'Curso B' },
  ];

  $ionicModal.fromTemplateUrl('templates/modulo/admin/tab.curso.cadastro.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.createCurso = function(u) {
    $scope.cursos.push({ nome: u.nome });
    $scope.modal.hide();
  };
})

.controller('TurmaCtrl', function($scope, $ionicModal) {

  $scope.turmas = [
    { nome: 'Turma 1' },
    { nome: 'Turma 2' },
    { nome: 'Turma 3' },
  ];

  $ionicModal.fromTemplateUrl('templates/modulo/admin/tab.turma.cadastro.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.createTurma = function(u) {
    $scope.turmas.push({ nome: u.nome });
    $scope.modal.hide();
  };
})

.controller('chamadaCtrl', function($scope, $http, $location) {
    // $scope.curso = {img:"", nome:"Curso A", professor:"Profs", aula:"12/10/1982" };

    // $http.get( 'http://'+ $location.host() +':3000/turma/' )
    // .success( function ( data ) {
    //     $scope.alunos = data;
    // })
    // .error( function( data ) {
    //     console.log( 'Erro: '+ data );
    // });

  alunos = [
     {nome: 'Student 1', aulas_presente: [(new Date()).format('dd/mm/yyyy'),'13/10/1982'] }
    ,{nome: 'Student 2', aulas_presente: [(new Date()).format('dd/mm/yyyy')] }
    ,{nome: 'Student 3', aulas_presente: [(new Date()).format('dd/mm/yyyy'), '14/10/1982'] }
  ]

  $scope.turma = {
     alunos: alunos
    ,data_aula: (new Date()).format('dd/mm/yyyy')
    ,professor: { nome: 'Wellington Dias' }
    ,curso: {
       nome: 'Dons e MinistÃ©rios'
      ,imagem: 'http://www.comunhao.com.br/images/4c0f082a3d29318f6deec8cd550ef1d6.jpg'
      ,descricao: 'CompreensÃ£o dos dons e ministÃ©rios apresentados na bÃ­blia, identificaÃ§Ã£o dos dons pessoais e suas aplicaÃ§Ãµes na Igreja de Cristo e na comunidade local.'
    }
  }

  $scope.alunos_presentes = function () {
    var alunos_presentes = 0;
    $scope.turma.alunos.find( function( aluno ) {
        if ( aluno.aulas_presente.indexOf( $scope.turma.data_aula ) != -1 ) {
          alunos_presentes++;
        }
    });
    if ( alunos_presentes == 0 )
      return 'Nenhum(a) aluno(a) presente';

    if ( alunos_presentes == 1 )
      return '1 aluno(a) presente';

    return alunos_presentes +' alunos(as) presentes';
  }

  $scope.data_aula = $scope.turma.data_aula;

  $scope.presenca = function( aluno ){
    var pos = aluno.aulas_presente.indexOf( $scope.turma.data_aula );
    if ( pos == -1 ) {
      aluno.aulas_presente.push( $scope.turma.data_aula );
    } else {
      aluno.aulas_presente.splice( pos, 1 );
    }

    console.log( JSON.stringify( aluno ) );
  }

})

.controller('calendarioCtrl', function($scope, $http) {
    $scope.now = new Date();

    // $http.get( "http://longani.me/api/calendario" ).then(function( response ) {

    // });

    $scope.calendarioAulas = [
        { "dataFormatada":"09/04/2016", "data":new Date("2016-05-01"), "descricao":"Aula 1" },
        { "dataFormatada":"15/05/2016", "data":new Date("2016-05-15"), "descricao":"Aula 2" },
        { "dataFormatada":"22/05/2016", "data":new Date("2016-05-22"), "descricao":"Aula 3" },
        { "dataFormatada":"29/05/2016", "data":new Date("2016-05-29"), "descricao":"Aula 4" },
        { "dataFormatada":"15/05/2016", "data":new Date("2016-05-15"), "descricao":"Aula 5" },
        { "dataFormatada":"05/06/2016", "data":new Date("2016-06-05"), "descricao":"Aula 6" },
        { "dataFormatada":"12/06/2016", "data":new Date("2016-06-12"), "descricao":"Aula 7" },
        { "dataFormatada":"19/06/2016", "data":new Date("2016-06-19"), "descricao":"Aula 8" },
        { "dataFormatada":"03/07/2016", "data":new Date("2016-07-03"), "descricao":"Formatura" },
    ];
});
