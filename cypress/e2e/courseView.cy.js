describe('test course view', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000')
        cy.get('#email').type('181@gmail.com')
        cy.get('#password').type('pass1234')
        cy.get('#btnLogin').click()
        cy.intercept(
            {
              method: 'POST',
              url: 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDccKXMRv1RtSZ5zm--yE-kmPYBW7JGq9k', 
            },
            []
          ).as('authenticateUser') 
        cy.intercept(
            {
              method: 'GET',
              url: '/auth/login/181@gmail.com', 
            },
            {
                "role": "STUDENT",
                "ID": "1"
            }
          ).as('getUsers')
          cy.intercept(
            {
              method: 'POST', 
              url: '/auth/validate',
            },
            []
          ).as('validate')
      })

    it('Go To Course Page', () => {
        cy.intercept(
            {
              method: 'GET',
              url: '/enrollment/1/student_course', 
            },
            [
                {
                    "id": 1,
                    "course_name": "Data Mining",
                    "start_date": "2022-12-11T00:00:00.000+00:00",
                    "end_date": "2023-01-01T00:00:00.000+00:00",
                    "course_link": "http://blablabla",
                    "details": null
                },
                {
                    "id": 3,
                    "course_name": "Data Preprocessing",
                    "start_date": "2022-12-11T00:00:00.000+00:00",
                    "end_date": "2023-01-01T00:00:00.000+00:00",
                    "course_link": "http://blablabla",
                    "details": null
                }
            ]
          ).as('getCourse')
        cy.get('#studentCourses').click()
        cy.url().should('eq', 'http://localhost:3000/student/courses')
    })

    it('See List of Course & Check the Details', () => {
      cy.intercept(
          {
            method: 'GET',
            url: '/enrollment/1/student_course', 
          },
          [
              {
                  "id": 1,
                  "course_name": "Data Mining",
                  "start_date": "2022-12-11T00:00:00.000+00:00",
                  "end_date": "2023-01-01T00:00:00.000+00:00",
                  "course_link": "http://blablabla",
                  "details": null
              },
              {
                  "id": 3,
                  "course_name": "Data Preprocessing",
                  "start_date": "2022-12-11T00:00:00.000+00:00",
                  "end_date": "2023-01-01T00:00:00.000+00:00",
                  "course_link": "http://blablabla",
                  "details": null
              }
          ]
        ).as('getCourse')
      cy.get('#studentCourses').click()
      cy.url().should('eq', 'http://localhost:3000/student/courses')
      cy.contains('Data Mining')
      cy.contains('Data Preprocessing')
      cy.contains('Start Date')
      cy.contains('End Date')
      cy.contains('2022-12-11T00:00:00.000+00:00')
      cy.contains('2023-01-01T00:00:00.000+00:00')
      cy.contains('Link')
      cy.get('#btnModule').contains('Overview').click()
      cy.url().should('eq', 'http://localhost:3000/student/courses/1')
  })
})