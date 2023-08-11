// External dependencies
const express = require('express');
const app = express();
const router = express.Router();
//app.use('/v2', version2Routes)

router.use('/', (req, res, next) => {
  // Set the current URL as a global variable in Nunjucks
  //console.log('res is >>> ', res);
  res.locals.currentUrl = req.originalUrl;
 
  next();
});


// Add your routes here - above the module.exports line

//data-processing-route-1 

router.get('/clear-proto-data', function(req, res) {
  req.session.destroy();
  res.redirect('/')
})


router.get('/dpi-kickoff', function(req, res){
  //dpi/data-processing-information
  delete req.session.data['subject-matter']
  delete req.session.data['duration-processing']
  delete req.session.data['nature-processing']
  delete req.session.data['types-of-processing']
  delete req.session.data['types-of-personal-data']
  delete req.session.data['categories-data-subjects']
  delete req.session.data['location-of-processing']
  delete req.session.data['officer-name']
  delete req.session.data['officer-email']
  delete req.session.data['officer-telephone-number']
  delete req.session.data['dpierror']
  delete req.session.data['officerError']
  
  

  res.redirect('/admin-solutions/dpi/data-processing-information')
})

router.post('/dpi-processing-route-one', function (req, res) {
    console.log('HIT ROUTE ONE')
    let subjectMatter = req.session.data['subject-matter']
    let durationProcessing = req.session.data['duration-processing']
    let natureProcessing = req.session.data['nature-processing']
    //let typesOfProcessing = req.session.data['types-of-processing']
    let typesOfPersonalData = req.session.data['types-of-personal-data']
    let categoriesDataSubjects = req.session.data['categories-data-subjects']
    let locationOfProcessing = req.session.data['location-of-processing']

    let isEdit = req.session.data['edit']

    var dpiError = ''

    if (!subjectMatter) {dpiError+='subjectmatter'}
    if (!durationProcessing) {dpiError+='durationprocessing'}
    if (!natureProcessing) {dpiError+='natureprocessing'}
    //if (!typesOfProcessing) {dpiError+='typesofprocessing'}
    if (!typesOfPersonalData) {dpiError+='typesofpersonaldata'}
    if (!categoriesDataSubjects) {dpiError+='categoriesdatasubjects'}
    if (!locationOfProcessing) {dpiError+='locationofprocessing'}    

    // add in check for errors :)
    if (!dpiError && !isEdit) {
        delete req.session.data['dpiError']
        res.redirect('/admin-solutions/dpi/data-protection-officer')
   }else if (!dpiError && isEdit) {
    delete req.session.data['dpiError']
    res.redirect('/admin-solutions/dpi/dpi-confirmation')
   }
    else {
      // No - reload page and show error
      res.redirect('/admin-solutions/dpi/data-processing-information?dpierror=' + dpiError)
    }
  })

  router.post('/sub-processing-add-route', function (req, res) {
    console.log('HIT SUB ROUTE PROCESSING')
    let subProcessorOrgName = req.session.data['sub-processor-organisation-name']
    let subMatterProcessing = req.session.data['subject-matter-of-the-processing']
    let durationOfTheProcessing = req.session.data['duration-of-the-processing']
    let subNatureAndPurpose = req.session.data['sub-nature-and-purpose']
    let subCategoriesDataSubjects = req.session.data['sub-categories-data-subjects']
    let planForReturn = req.session.data['plan-for-return']
    let subTypesOfPersonalData = req.session.data['sub-types-of-personal-data']
    

    var dpiSubError = ''

    if (!subProcessorOrgName) {dpiSubError += 'orgname'}
    if (!subMatterProcessing) {dpiSubError += 'subjectmatteroftheprocessing'}
    if (!durationOfTheProcessing) {dpiSubError += 'durationoftheprocessing'}
    if (!subNatureAndPurpose) {dpiSubError += 'subnatureandpurpose'}
    if (!planForReturn) {dpiSubError += 'planforreturn'}
    if (!subTypesOfPersonalData) {dpiSubError += 'subtypesofpersonaldata'}
    if (!subCategoriesDataSubjects) {dpiSubError += 'subcategoriesdatasubjects'}
    if (!planForReturn) {dpiSubError += 'planforreturn'}

    if(!req.session.data['sub-processor-list']) {
        req.session.data['sub-processor-list'] = []
    }

    let tempList = req.session.data['sub-processor-list']

    // add in check for errors :)
    if (!dpiSubError) {
        let subProcessor = {
            subProcessorOrgName: subProcessorOrgName,
            subMatterProcessing: subMatterProcessing ,
            durationOfTheProcessing: durationOfTheProcessing,
            subNatureAndPurpose: subNatureAndPurpose,
            subTypesOfPersonalData: subTypesOfPersonalData,
            subCategoriesDataSubjects: subCategoriesDataSubjects,
            planForReturn: planForReturn
        }
        tempList.push(subProcessor)
        req.session.data['sub-processor-list'] = tempList
        // delete all data in session
        delete req.session.data['sub-processor-organisation-name']
        delete req.session.data['subject-matter-of-the-processing']
        delete req.session.data['duration-of-the-processing']
        delete req.session.data['sub-nature-and-purpose']
        delete req.session.data['sub-categories-data-subjects']
        delete req.session.data['sub-categories-data-subjects']
        delete req.session.data['plan-for-return']
        delete req.session.data['sub-types-of-personal-data']
        delete req.session.data['dpisuberror']
        // end delete
        res.redirect('/admin-solutions/dpi/dpi-confirmation')
   } else {
      // No - reload page and show error
      res.redirect('/admin-solutions/dpi/sub-processor-start?dpisuberror=' + dpiSubError)
    }
  })

  // /sub-processing-edit-route

  router.post('/sub-processing-edit-route', function (req, res) {
    console.log('HIT EDIT SUB ROUTE PROCESSING')
    let subProcessorOrgName = req.session.data['sub-processor-organisation-name']
    let subMatterProcessing = req.session.data['subject-matter-of-the-processing']
    let durationOfTheProcessing = req.session.data['duration-of-the-processing']
    let subNatureAndPurpose = req.session.data['sub-nature-and-purpose']
    let subCategoriesDataSubjects = req.session.data['sub-categories-data-subjects']
    let planForReturn = req.session.data['plan-for-return']
    let subTypesOfPersonalData = req.session.data['sub-types-of-personal-data']
    let currentIndex = req.session.data['index']
    

    var dpiSubError = ''

    if (!subProcessorOrgName) {dpiSubError += 'orgname'}
    if (!subMatterProcessing) {dpiSubError += 'subjectmatteroftheprocessing'}
    if (!durationOfTheProcessing) {dpiSubError += 'durationoftheprocessing'}
    if (!subNatureAndPurpose) {dpiSubError += 'subnatureandpurpose'}
    if (!planForReturn) {dpiSubError += 'planforreturn'}
    if (!subTypesOfPersonalData) {dpiSubError += 'subtypesofpersonaldata'}
    if (!subCategoriesDataSubjects) {dpiSubError += 'subcategoriesdatasubjects'}
    if (!planForReturn) {dpiSubError += 'planforreturn'}

    if(!req.session.data['sub-processor-list']) {
        req.session.data['sub-processor-list'] = []
    }

    let tempList = req.session.data['sub-processor-list']

    // add in check for errors :)
    if (!dpiSubError) {
        let subProcessor = {
            subProcessorOrgName: subProcessorOrgName,
            subMatterProcessing: subMatterProcessing ,
            durationOfTheProcessing: durationOfTheProcessing,
            subNatureAndPurpose: subNatureAndPurpose,
            subTypesOfPersonalData: subTypesOfPersonalData,
            subCategoriesDataSubjects: subCategoriesDataSubjects,
            planForReturn: planForReturn
        }
        tempList[currentIndex] = subProcessor

        req.session.data['sub-processor-list'] = tempList
        // delete all data in session
        delete req.session.data['sub-processor-organisation-name']
        delete req.session.data['subject-matter-of-the-processing']
        delete req.session.data['duration-of-the-processing']
        delete req.session.data['sub-nature-and-purpose']
        delete req.session.data['sub-categories-data-subjects']
        delete req.session.data['sub-categories-data-subjects']
        delete req.session.data['plan-for-return']
        delete req.session.data['sub-types-of-personal-data']
        delete req.session.data['dpisuberror']
        // end delete
        res.redirect('/admin-solutions/dpi/edit-sub-processor?index='+currentIndex)
   } else {
      // No - reload page and show error
      res.redirect('/admin-solutions/dpi/edit-sub-processor?dpisuberror=' + dpiSubError + '&index='+ currentIndex)
    }
  })

  // delete-sub-route
  router.post('/delete-sub-route', function (req, res) {
    console.log('HIT ROUTE TWO')
    let theIndex = req.session.data['the-index']
    let tempList = req.session.data['sub-processor-list']
    tempList.splice(theIndex, 1)
    req.session.data['sub-processor-list'] = tempList
    res.redirect('/admin-solutions/dpi/dpi-confirmation')
  })



  router.post('/dpi-processing-route-two', function (req, res) {
    console.log('HIT ROUTE TWO')
    let officerName = req.session.data['officer-name']
    let officerEmail = req.session.data['officer-email']
    //let officerTel = req.session.data['officer-telephone-number']

    let isEdit = req.session.data['edit']

    var officerError = ''

    if (!officerName) {officerError+='name'}
    if(!officerEmail) {officerError+='email'}
    //if(!officerTel) {officerError+='tel'}
    // add in check for errors :)
    if (!officerError && !isEdit) {
        delete req.session.data['edit']
        res.redirect('/admin-solutions/dpi/sub-processor-pre')
   }else if (!officerError && isEdit) { 
      delete req.session.data['edit']
      res.redirect('/admin-solutions/dpi/dpi-confirmation')
   }
   else {
      // No - reload page and show error
      res.redirect('/admin-solutions/dpi/data-protection-officer?officerError='+officerError)
    }
  })

 
router.post('/dpi-upload-route', function (req, res) {
    console.log('UPLOAD ROUTE')
    let choice = req.session.data['dpi-choice']
    //console.log('choice is >>> ', choice)
   
    // Has radio been selected?
 
    if (choice) {
      // Yes - what one?
      if(choice === 'enter-dpi') {
        // delete req.session.data['email']
        // delete req.session.data['pid']
        // delete req.session.data['add-more-members']
        res.redirect('/admin-solutions/dpi/data-processing-information')
      } else {
          res.redirect('/admin-solutions/dpi/upload-start')
      }
   } else {
      // No - reload page and show error
      res.redirect('/admin-solutions/dpi/start?error=true')
    }
  })

  // dpi-sub-processor-pre

  router.post('/dpi-sub-processor-pre-route', function (req, res) {
    console.log('UPLOAD ROUTE')
    let choice = req.session.data['sub-processor-choice']
    
    //console.log('choice is >>> ', choice)
   
    // Has radio been selected?
 
    if (choice) {
      // Yes - what one?
      if(choice === 'yes') {
        // delete req.session.data['email']
        // delete req.session.data['pid']
        delete req.session.data['error']
        res.redirect('/admin-solutions/dpi/sub-processor-start')
      } else {
            delete req.session.data['error']
            res.redirect('/admin-solutions/dpi/dpi-confirmation')
      }
   } else {
      // No - reload page and show error
      res.redirect('/admin-solutions/dpi/sub-processor-pre?error=true')
    }
  })

  // merge-or-split-route

  router.post('/merge-or-split-route', function (req, res) {
    console.log('merge or split route hit')
    let choice = req.session.data['merge-or-split']
    let catSolution = req.session.data['selected-cat']
    if(choice === 'merge' || choice === 'split') {
      res.redirect('/order-v4/associated-services-only/order-5-4-2-add-solution-merge-split-guidance')
    }else if (choice === 'other') {
      res.redirect('/order-v4/associated-services-only/order-5-4-2-add-associated-service-v2?cat_solution='+catSolution)
    }else {
      res.redirect('/order-v4/associated-services-only/order-5-4-2-add-solution-merger-or-split?error=true')
    }
  })

  router.post('/add-associated-service-choice-old-route', function (req, res) {
    let choice = req.session.data['add-assoc-choice']
    console.log('add associated service choice is >>> ', choice)
    if(choice === 'yes') {
      delete req.session.data['error']
      res.redirect('/global-service-reciepients/select-associated-services')
    }else if (choice === 'no') {
      delete req.session.data['error']
      res.redirect('/global-service-reciepients/edit-solutions-and-services?cat_solution=genysys&addsols=document+management')
    }else {
      res.redirect('/global-service-reciepients/add-associated-service?cat_solution=genysys&addsols=automated+arrivals&addsols=document+management&error=true')
    }
  })

  router.post('/add-associated-service-choice-route', function (req, res) {
    let choice = req.session.data['add-assoc-choice']
    console.log('add associated service choice is >>> ', choice)
    if(choice === 'yes') {
      delete req.session.data['error']
      res.redirect('/global-service-reciepients-dynamic/select-associated-services')
    }else if (choice === 'no') {
      delete req.session.data['error']
      res.redirect('/global-service-reciepients-dynamic/edit-solutions-and-services?cat_solution=genysys&addsols=document+management')
    }else {
      res.redirect('/global-service-reciepients-dynamic/add-associated-service?cat_solution=genysys&addsols=automated+arrivals&addsols=document+management&error=true')
    }
  })

  router.post('/same-planned-delivery-date-old-route', function (req, res) {
    console.log('planned delivery date route')
    let choice = req.session.data['same-ppd']
    if(choice === 'yes') {
      res.redirect('/global-service-reciepients/review-planned-delivery-dates-main?datesEdited=false')
    }else if (choice === 'no') {
      res.redirect('/global-service-reciepients/planned-delivery-dates-emis')
    }else {
      res.redirect('/global-service-reciepients/planned-delivery-date?error=true')
    }
  })

  router.post('/same-planned-delivery-date-route', function (req, res) {
    console.log('planned delivery date route')
    let choice = req.session.data['same-ppd']
    if(choice === 'yes') {
      res.redirect('/global-service-reciepients-dynamic/review-planned-delivery-dates-main?datesEdited=false')
    }else if (choice === 'no') {
      res.redirect('/global-service-reciepients-dynamic/planned-delivery-dates-emis')
    }else {
      res.redirect('/global-service-reciepients-dynamic/planned-delivery-date?error=true')
    }
  })

  //confirm-service-recipients-route

  router.post('/confirm-service-recipients-route', function (req, res) {
    console.log('confirm service recipients >>> ', req.session.data['tester'])
    let choice = req.session.data['same-ppd']
    if(choice === 'yes') {
      res.redirect('/order-v4/pdd/7a-review-planned-delivery-dates-main')
    }else if (choice === 'no') {
      res.redirect('/order-v4/pdd/4-planned-delivery-dates-emis')
    }else {
      res.redirect('/global-service-reciepients/confirm-service-recipients')
    }
  })

  // check box route

  router.post('/global-service-recipients-route', function (req, res) {
    //console.log('confirm service recipients >>> ', req.session.data['selected-srs'])
    let checks = req.session.data['selected-srs']
    let srData = JSON.parse(req.session.data['srJsonData'])
    console.log(req.session.data['srJsonData'])
    let grouped = {};

    for (let item of srData) {
      let category = item.category;
      let org = { name: item.name, code: item.orgCode };

      if (!grouped[category]) {
        grouped[category] = [];
      }

      grouped[category].push(org);
    }

    let result = [];

    for (let category in grouped) {
      result.push({ categoryName: category, organisations: grouped[category] });
    }

    console.log(result);

    
    //console.log(re);
    req.session.data['srJsonData'] = result
    console.log('session data is now >>> ', req.session.data['srJsonData'])
    // console.log('formatted sr data is >>> ', req.session.data['srJsonData'])
    if(checks.length > 0 ) {
      console.log('service recipients found >>> ', checks.length)
      req.session.data['sorted-srs'] = req.session.data['selected-srs']
      res.redirect('/global-service-reciepients-dynamic/confirm-service-recipients')
    }else {
      res.redirect('global-service-reciepients-dynamic/add-service-recipients-global?error=true')
    }
  })

module.exports = router;
 
function addToList(obj, itemList, change) {
    if(!itemList){
      itemList = []; // if no array exists create one
    }
    // Is the user changing an option?
    if(change) {
      // yes - find object to change and overwrite
      itemList.splice(change, 1, obj);
    } else {
      // no - add new object
      itemList.push(obj);
    }
    return itemList; // return edited array
  }
  // remove from list
  function removeFromList(obj, itemList) {
    console.log('obj >> ', obj, ' itemList > ', itemList)
    if(!itemList){
      itemList = []; // if no array exists create one
    }
    if(obj) {
      itemList.splice(obj, 1); // find object and remove
    }
    return itemList; // return edited array
  }