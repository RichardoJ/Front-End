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
            {
              "kind": "identitytoolkit#VerifyPasswordResponse",
              "localId": "sai8QxIU62gh3myYHFQMwHtX2vP2",
              "email": "181@gmail.com",
              "displayName": "",
              "idToken": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImFmZjFlNDJlNDE0M2I4MTQxM2VjMTI1MzQwOTcwODUxZThiNDdiM2YiLCJ0eXAiOiJKV1QifQ.eyJjdXN0b21fY2xhaW1zIjpbIlJFQUQiLCJXUklURSJdLCJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vc3ByaW5nLWJvb3QtZmlyZWJhc2UtMTAwOGIiLCJhdWQiOiJzcHJpbmctYm9vdC1maXJlYmFzZS0xMDA4YiIsImF1dGhfdGltZSI6MTY3MTY1OTEyNCwidXNlcl9pZCI6InNhaThReElVNjJnaDNteVlIRlFNd0h0WDJ2UDIiLCJzdWIiOiJzYWk4UXhJVTYyZ2gzbXlZSEZRTXdIdFgydlAyIiwiaWF0IjoxNjcxNjU5MTI0LCJleHAiOjE2NzE2NjI3MjQsImVtYWlsIjoiMTgxQGdtYWlsLmNvbSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwiZmlyZWJhc2UiOnsiaWRlbnRpdGllcyI6eyJlbWFpbCI6WyIxODFAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.amfTBHbvXs5ei8_fG1Zs2MhsireR5gB-fCF7UnyjchMy8iPsM13FXzZNwIe2A8XT2NDWN10I6MVwqDToesE_ZV4kzBkXIK3ICawL56wN49kc28GP-8CdTfGDNiNqDsF-kXaNIzmzfsqBkONntD9-KKOIg2diebFxPp4U7VW7LmmLXXukxiKA42g3SG8XoWvKW51tDPvrPNSWCEv0vcRRj26XAVtxN50S9CcPrnMZ-o5_a647aM-OuM7VbfL9TWSrF0sxy31pFcg-nZ00VDpdk0l0Ux0tb5Stosc9l8VZ5ilHUQnvqfCYEpfrapoLm2B_rcfbg3AjHHSKzBgLWgbY8A",
              "registered": true,
              "refreshToken": "AOkPPWQARPCjm0KeYrPmGoP-N79kset08_CdlZYlURPrIbIDuL07TM7NE5-nR93P-l-AWS9hAT1hV5-fpI8I6707D4Kj6JBE11E6cjtF_r2gpJt6OdrRvA1RLXaKff9t-dJTYUpd-VwvavHHOIMQROcNkq8LWjCi4YC_CYflvpVS4GdsdkxVPeXKHeHNL20uKJGvf_-d_3XCzzeus653T5djnSXjtPRLj0R-rdgQZqDEkK3VeKRh_KY",
              "expiresIn": "3600"
            }
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
            {}
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
      cy.get("#btnLogout").should("be.visible").click();
      cy.url().should("eq", "http://localhost:3000/");
  })
})