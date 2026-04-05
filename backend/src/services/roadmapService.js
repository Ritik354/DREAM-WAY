import Roadmap from "../models/Roadmap.js";
import Module from "../models/Module.js";
import Topic from "../models/Topic.js";
import Progress from "../models/Progress.js";

const sampleRoadmaps = [
  {
    title: "C Programming Roadmap",
    description:
      "Master the fundamentals of C programming language, from basics to advanced concepts.",
    modules: [
      {
        title: "C Fundamentals",
        description:
          "Learn the basics of C programming including syntax, variables, and control structures.",
        order: 1,
        topics: [
          {
            title: "Introduction to C",
            description:
              "Understand what C is, its history, and why it's still relevant today.",
            videoUrl: "https://www.youtube.com/watch?v=KJgsSFOSQv0",
            resources: [
              {
                title: "C Programming Wiki",
                url: "https://en.wikipedia.org/wiki/C_(programming_language)",
              },
              { title: "C Reference", url: "https://en.cppreference.com/w/c" },
            ],
            order: 1,
          },
          {
            title: "Variables and Data Types",
            description:
              "Learn about different data types, variable declaration, and memory concepts.",
            videoUrl: "https://www.youtube.com/watch?v=8Ib7nwc33L8",
            resources: [
              {
                title: "Data Types in C",
                url: "https://www.geeksforgeeks.org/data-types-in-c/",
              },
            ],
            order: 2,
          },
          {
            title: "Control Structures",
            description: "Master if-else, loops, and switch statements in C.",
            videoUrl: "https://www.youtube.com/watch?v=4XTsAAHW_Tc",
            resources: [
              {
                title: "Control Flow",
                url: "https://www.tutorialspoint.com/cprogramming/c_decision_making.htm",
              },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "Functions and Pointers",
        description:
          "Understand functions, pointers, and memory management in C.",
        order: 2,
        topics: [
          {
            title: "Functions in C",
            description:
              "Learn function declaration, definition, and parameter passing.",
            videoUrl: "https://www.youtube.com/watch?v=5kNXhDj-gBU",
            resources: [
              {
                title: "Functions Guide",
                url: "https://www.geeksforgeeks.org/functions-in-c/",
              },
            ],
            order: 1,
          },
          {
            title: "Pointers Fundamentals",
            description:
              "Master pointer concepts, memory addresses, and dereferencing.",
            videoUrl: "https://www.youtube.com/watch?v=zuegQmMdy8M",
            resources: [
              {
                title: "Pointers Tutorial",
                url: "https://www.programiz.com/c-programming/c-pointers",
              },
            ],
            order: 2,
          },
          {
            title: "Dynamic Memory",
            description:
              "Learn malloc, calloc, realloc, and free for dynamic memory allocation.",
            videoUrl: "https://www.youtube.com/watch?v=xDVC3wKjS64",
            resources: [
              {
                title: "Dynamic Memory",
                url: "https://www.geeksforgeeks.org/dynamic-memory-allocation-in-c-using-malloc-calloc-free-and-realloc/",
              },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "Data Structures in C",
        description: "Implement fundamental data structures using C.",
        order: 3,
        topics: [
          {
            title: "Arrays and Strings",
            description:
              "Work with arrays, multi-dimensional arrays, and string operations.",
            videoUrl: "https://www.youtube.com/watch?v=R9Plq-D1gww",
            resources: [
              {
                title: "Arrays in C",
                url: "https://www.programiz.com/c-programming/c-arrays",
              },
            ],
            order: 1,
          },
          {
            title: "Structures and Unions",
            description: "Learn about struct, union, and typedef in C.",
            videoUrl: "https://www.youtube.com/watch?v=0pTS9OgQm7Y",
            resources: [
              {
                title: "Structures",
                url: "https://www.geeksforgeeks.org/structures-c/",
              },
            ],
            order: 2,
          },
          {
            title: "File I/O",
            description:
              "Read from and write to files using C file operations.",
            videoUrl: "https://www.youtube.com/watch?v=8S8qiHZoYqU",
            resources: [
              {
                title: "File Handling",
                url: "https://www.programiz.com/c-programming/c-file-input-output",
              },
            ],
            order: 3,
          },
        ],
      },
    ],
  },
  {
    title: "C++ Programming Roadmap",
    description:
      "Comprehensive guide to modern C++ programming from basics to advanced features.",
    modules: [
      {
        title: "C++ Basics",
        description:
          "Start with C++ fundamentals, OOP concepts, and standard library.",
        order: 1,
        topics: [
          {
            title: "C++ Introduction",
            description:
              "Learn C++ syntax, compilation, and basic differences from C.",
            videoUrl: "https://www.youtube.com/watch?v=vLnPwxZdW4Y",
            resources: [
              {
                title: "C++ Reference",
                url: "https://en.cppreference.com/w/cpp",
              },
              { title: "Learn C++", url: "https://www.learncpp.com/" },
            ],
            order: 1,
          },
          {
            title: "Object-Oriented Programming",
            description:
              "Master classes, objects, inheritance, polymorphism, and encapsulation.",
            videoUrl: "https://www.youtube.com/watch?v=wN0x9eZLix4",
            resources: [
              {
                title: "OOP in C++",
                url: "https://www.geeksforgeeks.org/object-oriented-programming-in-cpp/",
              },
            ],
            order: 2,
          },
          {
            title: "STL Containers",
            description:
              "Learn vector, list, map, set, and other STL containers.",
            videoUrl: "https://www.youtube.com/watch?v=LyGlTmaWEPs",
            resources: [
              {
                title: "STL Tutorial",
                url: "https://www.geeksforgeeks.org/the-c-standard-template-library-stl/",
              },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "Advanced C++",
        description:
          "Explore modern C++ features, templates, and design patterns.",
        order: 2,
        topics: [
          {
            title: "Templates and Generics",
            description:
              "Function templates, class templates, and template metaprogramming.",
            videoUrl: "https://www.youtube.com/watch?v=I-hZkUa9mIs",
            resources: [
              {
                title: "Templates",
                url: "https://www.geeksforgeeks.org/templates-cpp/",
              },
            ],
            order: 1,
          },
          {
            title: "Smart Pointers",
            description:
              "unique_ptr, shared_ptr, weak_ptr, and RAII principles.",
            videoUrl: "https://www.youtube.com/watch?v=UOB7-B2MfwA",
            resources: [
              {
                title: "Smart Pointers",
                url: "https://www.geeksforgeeks.org/smart-pointers-cpp/",
              },
            ],
            order: 2,
          },
          {
            title: "C++11/14/17 Features",
            description:
              "Lambda expressions, auto, range-based loops, and modern C++ features.",
            videoUrl: "https://www.youtube.com/watch?v=32tDTD9UJCE",
            resources: [{ title: "Modern C++", url: "https://isocpp.org/" }],
            order: 3,
          },
        ],
      },
      {
        title: "C++ Development Tools",
        description:
          "Learn build systems, debugging, and development best practices.",
        order: 3,
        topics: [
          {
            title: "CMake and Build Systems",
            description:
              "Learn CMake for cross-platform C++ project management.",
            videoUrl: "https://www.youtube.com/watch?v=HPMvU64RUTY",
            resources: [
              {
                title: "CMake Tutorial",
                url: "https://cmake.org/cmake/help/latest/guide/tutorial/index.html",
              },
            ],
            order: 1,
          },
          {
            title: "Debugging and Testing",
            description: "gdb, valgrind, unit testing with Google Test.",
            videoUrl: "https://www.youtube.com/watch?v=clTuAA7Z8KQ",
            resources: [
              {
                title: "GDB Guide",
                url: "https://www.gnu.org/software/gdb/documentation/",
              },
            ],
            order: 2,
          },
        ],
      },
    ],
  },
  {
    title: "Java Programming Roadmap",
    description:
      "Complete Java development guide from basics to enterprise applications.",
    modules: [
      {
        title: "Java Fundamentals",
        description: "Learn Java syntax, OOP, and core concepts.",
        order: 1,
        topics: [
          {
            title: "Java Introduction",
            description: "JVM, JDK, JRE, and basic Java program structure.",
            videoUrl: "https://www.youtube.com/watch?v=eIrMbAQSU34",
            resources: [
              { title: "Java Docs", url: "https://docs.oracle.com/en/java/" },
              {
                title: "Java Tutorial",
                url: "https://docs.oracle.com/javase/tutorial/",
              },
            ],
            order: 1,
          },
          {
            title: "Object-Oriented Programming",
            description:
              "Classes, objects, inheritance, polymorphism, abstraction, encapsulation.",
            videoUrl: "https://www.youtube.com/watch?v=8YjFbMbfXaQ",
            resources: [
              {
                title: "OOP Concepts",
                url: "https://www.geeksforgeeks.org/object-oriented-programming-oops-concept-in-java/",
              },
            ],
            order: 2,
          },
          {
            title: "Exception Handling",
            description: "Try-catch blocks, throw, throws, custom exceptions.",
            videoUrl: "https://www.youtube.com/watch?v=1XAfapkEjmo",
            resources: [
              {
                title: "Exceptions",
                url: "https://docs.oracle.com/javase/tutorial/essential/exceptions/",
              },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "Java Collections & Generics",
        description:
          "Master Java collections framework and generic programming.",
        order: 2,
        topics: [
          {
            title: "Collections Framework",
            description:
              "List, Set, Map, Queue interfaces and their implementations.",
            videoUrl: "https://www.youtube.com/watch?v=viTHcIfW0EM",
            resources: [
              {
                title: "Collections",
                url: "https://docs.oracle.com/javase/8/docs/technotes/guides/collections/index.html",
              },
            ],
            order: 1,
          },
          {
            title: "Generics",
            description:
              "Generic classes, methods, wildcards, and type erasure.",
            videoUrl: "https://www.youtube.com/watch?v=K1iu1kXkVoA",
            resources: [
              {
                title: "Generics Tutorial",
                url: "https://docs.oracle.com/javase/tutorial/java/generics/",
              },
            ],
            order: 2,
          },
          {
            title: "Streams API",
            description: "Functional programming with Java 8 streams.",
            videoUrl: "https://www.youtube.com/watch?v=t1-YZ6bF-g0",
            resources: [
              {
                title: "Streams API",
                url: "https://docs.oracle.com/javase/8/docs/api/java/util/stream/package-summary.html",
              },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "Spring Framework",
        description: "Learn Spring Boot for enterprise Java development.",
        order: 3,
        topics: [
          {
            title: "Spring Boot Basics",
            description: "Spring Boot setup, configuration, and REST APIs.",
            videoUrl: "https://www.youtube.com/watch?v=vtPkZShrvXQ",
            resources: [
              {
                title: "Spring Boot",
                url: "https://spring.io/projects/spring-boot",
              },
            ],
            order: 1,
          },
          {
            title: "Spring Data JPA",
            description: "Database operations with Spring Data and Hibernate.",
            videoUrl: "https://www.youtube.com/watch?v=8SGI_XS5OPw",
            resources: [
              {
                title: "Spring Data",
                url: "https://spring.io/projects/spring-data",
              },
            ],
            order: 2,
          },
          {
            title: "Spring Security",
            description:
              "Authentication and authorization in Spring applications.",
            videoUrl: "https://www.youtube.com/watch?v=her_7pa0vrg",
            resources: [
              {
                title: "Spring Security",
                url: "https://spring.io/projects/spring-security",
              },
            ],
            order: 3,
          },
        ],
      },
    ],
  },
  {
    title: "Python Programming Roadmap",
    description:
      "Complete Python development guide from beginner to advanced topics.",
    modules: [
      {
        title: "Python Basics",
        description:
          "Learn Python syntax, data types, and fundamental concepts.",
        order: 1,
        topics: [
          {
            title: "Python Introduction",
            description: "Installation, basic syntax, and Python philosophy.",
            videoUrl: "https://www.youtube.com/watch?v=kqtD5dpn9C8",
            resources: [
              { title: "Python Docs", url: "https://docs.python.org/3/" },
              {
                title: "Python Tutorial",
                url: "https://docs.python.org/3/tutorial/",
              },
            ],
            order: 1,
          },
          {
            title: "Data Types & Structures",
            description:
              "Lists, tuples, dictionaries, sets, and string operations.",
            videoUrl: "https://www.youtube.com/watch?v=W8KRzm-HUcg",
            resources: [
              {
                title: "Data Structures",
                url: "https://docs.python.org/3/tutorial/datastructures.html",
              },
            ],
            order: 2,
          },
          {
            title: "Control Flow",
            description:
              "Conditionals, loops, comprehensions, and error handling.",
            videoUrl: "https://www.youtube.com/watch?v=PqFKRqpHrjw",
            resources: [
              {
                title: "Control Flow",
                url: "https://docs.python.org/3/tutorial/controlflow.html",
              },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "Object-Oriented Python",
        description:
          "Classes, inheritance, decorators, and advanced Python features.",
        order: 2,
        topics: [
          {
            title: "Classes and Objects",
            description: "Object-oriented programming in Python.",
            videoUrl: "https://www.youtube.com/watch?v=ZDa-Z5JzLYM",
            resources: [
              {
                title: "Classes",
                url: "https://docs.python.org/3/tutorial/classes.html",
              },
            ],
            order: 1,
          },
          {
            title: "Decorators & Generators",
            description: "Advanced Python features for clean, efficient code.",
            videoUrl: "https://www.youtube.com/watch?v=FsAPt_9Bf3U",
            resources: [
              {
                title: "Decorators",
                url: "https://realpython.com/primer-on-python-decorators/",
              },
            ],
            order: 2,
          },
          {
            title: "Modules & Packages",
            description:
              "Organizing code with modules, packages, and virtual environments.",
            videoUrl: "https://www.youtube.com/watch?v=sugvnHA7ElY",
            resources: [
              {
                title: "Modules",
                url: "https://docs.python.org/3/tutorial/modules.html",
              },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "Python Frameworks",
        description:
          "Web development with Django and Flask, data science with pandas.",
        order: 3,
        topics: [
          {
            title: "Django Web Framework",
            description: "Full-stack web development with Django.",
            videoUrl: "https://www.youtube.com/watch?v=rHux0gMZ3Eg",
            resources: [
              { title: "Django Docs", url: "https://www.djangoproject.com/" },
            ],
            order: 1,
          },
          {
            title: "Flask Microframework",
            description: "Lightweight web development with Flask.",
            videoUrl: "https://www.youtube.com/watch?v=Z1RJmh_OqeA",
            resources: [
              {
                title: "Flask Docs",
                url: "https://flask.palletsprojects.com/",
              },
            ],
            order: 2,
          },
          {
            title: "Data Science with Pandas",
            description:
              "Data manipulation and analysis with pandas and numpy.",
            videoUrl: "https://www.youtube.com/watch?v=vmEHCJofslg",
            resources: [{ title: "Pandas", url: "https://pandas.pydata.org/" }],
            order: 3,
          },
        ],
      },
    ],
  },
  {
    title: "MERN Stack Roadmap",
    description:
      "Build full-stack applications using MongoDB, Express, React, and Node.js.",
    modules: [
      {
        title: "React Fundamentals",
        description:
          "Learn React basics, components, state management, and hooks.",
        order: 1,
        topics: [
          {
            title: "React Introduction",
            description: "JSX, components, props, and React fundamentals.",
            videoUrl: "https://www.youtube.com/watch?v=Ke90Tje7VS0",
            resources: [
              {
                title: "React Docs",
                url: "https://react.dev/docs/getting-started",
              },
            ],
            order: 1,
          },
          {
            title: "State Management",
            description: "useState, useEffect, and component lifecycle.",
            videoUrl: "https://www.youtube.com/watch?v=O6P86uwfdR0",
            resources: [
              {
                title: "Hooks Guide",
                url: "https://react.dev/reference/react",
              },
            ],
            order: 2,
          },
          {
            title: "React Router",
            description: "Client-side routing and navigation in React apps.",
            videoUrl: "https://www.youtube.com/watch?v=Law7wfdg_ls",
            resources: [
              { title: "React Router", url: "https://reactrouter.com/en/main" },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "Node.js & Express",
        description: "Build backend APIs with Node.js and Express framework.",
        order: 2,
        topics: [
          {
            title: "Node.js Basics",
            description: "Node.js runtime, npm, and basic server setup.",
            videoUrl: "https://www.youtube.com/watch?v=TlB_eWDSMt4",
            resources: [
              { title: "Node.js Docs", url: "https://nodejs.org/en/docs/" },
            ],
            order: 1,
          },
          {
            title: "Express Framework",
            description: "REST APIs, middleware, and Express routing.",
            videoUrl: "https://www.youtube.com/watch?v=L72fhGm1tfE",
            resources: [
              { title: "Express Docs", url: "https://expressjs.com/" },
            ],
            order: 2,
          },
          {
            title: "Authentication & JWT",
            description: "User authentication with JWT tokens and bcrypt.",
            videoUrl: "https://www.youtube.com/watch?v=2PPSXonhIck",
            resources: [{ title: "JWT.io", url: "https://jwt.io/" }],
            order: 3,
          },
        ],
      },
      {
        title: "MongoDB & Mongoose",
        description:
          "Database design and operations with MongoDB and Mongoose ODM.",
        order: 3,
        topics: [
          {
            title: "MongoDB Basics",
            description:
              "NoSQL concepts, documents, collections, and CRUD operations.",
            videoUrl: "https://www.youtube.com/watch?v=c2M-rlkkT5o",
            resources: [
              { title: "MongoDB Docs", url: "https://docs.mongodb.com/" },
            ],
            order: 1,
          },
          {
            title: "Mongoose ODM",
            description:
              "Schema design, models, and database operations with Mongoose.",
            videoUrl: "https://www.youtube.com/watch?v=DZBGEVgL2eE",
            resources: [
              { title: "Mongoose Docs", url: "https://mongoosejs.com/" },
            ],
            order: 2,
          },
          {
            title: "Database Relationships",
            description:
              "Referencing, embedding, and data modeling best practices.",
            videoUrl: "https://www.youtube.com/watch?v=3yLyvm2SaJE",
            resources: [
              {
                title: "Data Modeling",
                url: "https://docs.mongodb.com/manual/core/data-modeling-introduction/",
              },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "Full-Stack Integration",
        description:
          "Connect frontend and backend, deployment, and production best practices.",
        order: 4,
        topics: [
          {
            title: "API Integration",
            description: "Connect React frontend with Express backend APIs.",
            videoUrl: "https://www.youtube.com/watch?v=4UZrsTqkcW4",
            resources: [
              { title: "Axios Docs", url: "https://axios-http.com/docs/intro" },
            ],
            order: 1,
          },
          {
            title: "Deployment",
            description: "Deploy MERN applications to production environments.",
            videoUrl: "https://www.youtube.com/watch?v=71wSzpLyW9k",
            resources: [
              {
                title: "Heroku Deployment",
                url: "https://devcenter.heroku.com/categories/nodejs",
              },
            ],
            order: 2,
          },
        ],
      },
    ],
  },
  // Web Development Roadmaps
  {
    title: "Frontend Development Roadmap",
    description:
      "Master modern frontend development with HTML, CSS, JavaScript, and popular frameworks.",
    modules: [
      {
        title: "HTML & CSS Fundamentals",
        description: "Learn the building blocks of web development.",
        order: 1,
        topics: [
          {
            title: "HTML5 Essentials",
            description: "Semantic HTML, forms, multimedia, and accessibility.",
            videoUrl: "https://www.youtube.com/watch?v=UB1O30fR-EE",
            resources: [
              {
                title: "HTML5 Docs",
                url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
              },
              { title: "HTML Reference", url: "https://htmlreference.io/" },
            ],
            order: 1,
          },
          {
            title: "CSS3 Mastery",
            description:
              "Selectors, box model, flexbox, grid, and responsive design.",
            videoUrl: "https://www.youtube.com/watch?v=ieTHC78giGQ",
            resources: [
              {
                title: "CSS Docs",
                url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
              },
              { title: "CSS Tricks", url: "https://css-tricks.com/" },
            ],
            order: 2,
          },
          {
            title: "Responsive Web Design",
            description:
              "Media queries, mobile-first design, and cross-browser compatibility.",
            videoUrl: "https://www.youtube.com/watch?v=0ohtVzCSHqs",
            resources: [
              {
                title: "Responsive Design Guide",
                url: "https://developers.google.com/web/fundamentals/design-and-ux/responsive",
              },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "JavaScript Fundamentals",
        description: "Master modern JavaScript (ES6+) programming.",
        order: 2,
        topics: [
          {
            title: "JavaScript Basics",
            description:
              "Variables, functions, objects, arrays, and DOM manipulation.",
            videoUrl: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
            resources: [
              {
                title: "JavaScript MDN",
                url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
              },
              { title: "JavaScript.info", url: "https://javascript.info/" },
            ],
            order: 1,
          },
          {
            title: "ES6+ Features",
            description:
              "Arrow functions, destructuring, promises, async/await, and modules.",
            videoUrl: "https://www.youtube.com/watch?v=NCwa_xi0Uuc",
            resources: [
              {
                title: "ES6 Features",
                url: "https://github.com/lukehoban/es6features",
              },
            ],
            order: 2,
          },
          {
            title: "Asynchronous JavaScript",
            description: "Callbacks, promises, async/await, and fetch API.",
            videoUrl: "https://www.youtube.com/watch?v=PoRJizFvM7s",
            resources: [
              {
                title: "Async JavaScript",
                url: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous",
              },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "Modern Frontend Frameworks",
        description:
          "Learn React, Vue.js, and Angular for building dynamic web applications.",
        order: 3,
        topics: [
          {
            title: "React.js Deep Dive",
            description:
              "Components, hooks, context, and advanced React patterns.",
            videoUrl: "https://www.youtube.com/watch?v=4UZrsTqkcW4",
            resources: [
              { title: "React Docs", url: "https://react.dev/" },
              { title: "React Patterns", url: "https://reactpatterns.com/" },
            ],
            order: 1,
          },
          {
            title: "Vue.js Fundamentals",
            description: "Vue components, directives, and the composition API.",
            videoUrl: "https://www.youtube.com/watch?v=FXpIoQ_rT_c",
            resources: [{ title: "Vue.js Docs", url: "https://vuejs.org/" }],
            order: 2,
          },
          {
            title: "State Management",
            description: "Redux, Zustand, Pinia, and global state management.",
            videoUrl: "https://www.youtube.com/watch?v=poQXNp9ItL4",
            resources: [{ title: "Redux Docs", url: "https://redux.js.org/" }],
            order: 3,
          },
        ],
      },
      {
        title: "Build Tools & Performance",
        description: "Webpack, Vite, testing, and performance optimization.",
        order: 4,
        topics: [
          {
            title: "Build Tools",
            description: "Webpack, Vite, Parcel, and module bundling.",
            videoUrl: "https://www.youtube.com/watch?v=5IG4UmULyoA",
            resources: [
              { title: "Webpack Docs", url: "https://webpack.js.org/" },
              { title: "Vite Docs", url: "https://vitejs.dev/" },
            ],
            order: 1,
          },
          {
            title: "Testing Frameworks",
            description: "Jest, React Testing Library, and end-to-end testing.",
            videoUrl: "https://www.youtube.com/watch?v=T2sv8jXoP4s",
            resources: [
              { title: "Jest Docs", url: "https://jestjs.io/" },
              { title: "Testing Library", url: "https://testing-library.com/" },
            ],
            order: 2,
          },
          {
            title: "Performance Optimization",
            description: "Code splitting, lazy loading, and web vitals.",
            videoUrl: "https://www.youtube.com/watch?v=0fONene3OIA",
            resources: [
              { title: "Web Performance", url: "https://web.dev/performance/" },
            ],
            order: 3,
          },
        ],
      },
    ],
  },
  {
    title: "Backend Development Roadmap",
    description:
      "Master server-side development with Node.js, Python, Java, and cloud technologies.",
    modules: [
      {
        title: "Backend Fundamentals",
        description:
          "HTTP, REST APIs, authentication, and server architecture.",
        order: 1,
        topics: [
          {
            title: "HTTP & REST APIs",
            description:
              "HTTP methods, status codes, REST principles, and API design.",
            videoUrl: "https://www.youtube.com/watch?v=Q-BpqyOT3a8",
            resources: [
              { title: "REST API Tutorial", url: "https://restfulapi.net/" },
              { title: "HTTP Status Codes", url: "https://httpstatuses.com/" },
            ],
            order: 1,
          },
          {
            title: "Authentication & Security",
            description: "JWT, OAuth, sessions, and security best practices.",
            videoUrl: "https://www.youtube.com/watch?v=2PPSXonhIck",
            resources: [
              { title: "JWT.io", url: "https://jwt.io/" },
              { title: "OAuth 2.0", url: "https://oauth.net/2/" },
            ],
            order: 2,
          },
          {
            title: "Server Architecture",
            description: "MVC, layered architecture, and design patterns.",
            videoUrl: "https://www.youtube.com/watch?v=cKdn_P-muO8",
            resources: [
              {
                title: "Design Patterns",
                url: "https://refactoring.guru/design-patterns",
              },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "Database Design & Management",
        description: "SQL, NoSQL, database design, and ORM tools.",
        order: 2,
        topics: [
          {
            title: "SQL Fundamentals",
            description: "Queries, joins, indexes, and database normalization.",
            videoUrl: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
            resources: [
              { title: "SQLZoo", url: "https://sqlzoo.net/" },
              {
                title: "PostgreSQL Docs",
                url: "https://www.postgresql.org/docs/",
              },
            ],
            order: 1,
          },
          {
            title: "NoSQL Databases",
            description: "MongoDB, Redis, and document-based databases.",
            videoUrl: "https://www.youtube.com/watch?v=c2M-rlkkT5o",
            resources: [
              {
                title: "MongoDB University",
                url: "https://university.mongodb.com/",
              },
            ],
            order: 2,
          },
          {
            title: "ORM & Database Tools",
            description: "Mongoose, Sequelize, TypeORM, and migration tools.",
            videoUrl: "https://www.youtube.com/watch?v=DZBGEVgL2eE",
            resources: [
              { title: "Prisma Docs", url: "https://www.prisma.io/docs" },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "Microservices & APIs",
        description:
          "API gateways, service discovery, and microservices architecture.",
        order: 3,
        topics: [
          {
            title: "Microservices Architecture",
            description:
              "Service decomposition, communication patterns, and scalability.",
            videoUrl: "https://www.youtube.com/watch?v=y8OnoxKotPQ",
            resources: [
              {
                title: "Microservices Guide",
                url: "https://microservices.io/",
              },
            ],
            order: 1,
          },
          {
            title: "API Development",
            description: "GraphQL, OpenAPI, and advanced API patterns.",
            videoUrl: "https://www.youtube.com/watch?v=783ccP__No8",
            resources: [
              { title: "GraphQL Docs", url: "https://graphql.org/learn/" },
            ],
            order: 2,
          },
          {
            title: "Containerization",
            description: "Docker, Kubernetes, and container orchestration.",
            videoUrl: "https://www.youtube.com/watch?v=3c-iBn73dDE",
            resources: [
              { title: "Docker Docs", url: "https://docs.docker.com/" },
              { title: "Kubernetes Docs", url: "https://kubernetes.io/docs/" },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "Backend Frameworks",
        description: "Express.js, Django, Spring Boot, and FastAPI.",
        order: 4,
        topics: [
          {
            title: "Node.js Frameworks",
            description:
              "Express.js, Fastify, and NestJS for scalable applications.",
            videoUrl: "https://www.youtube.com/watch?v=L72fhGm1tfE",
            resources: [
              { title: "NestJS Docs", url: "https://docs.nestjs.com/" },
            ],
            order: 1,
          },
          {
            title: "Python Frameworks",
            description: "Django, Flask, and FastAPI for Python backends.",
            videoUrl: "https://www.youtube.com/watch?v=FPTIJc-J-2E",
            resources: [
              { title: "FastAPI Docs", url: "https://fastapi.tiangolo.com/" },
            ],
            order: 2,
          },
          {
            title: "Java Frameworks",
            description:
              "Spring Boot, Micronaut, and enterprise Java development.",
            videoUrl: "https://www.youtube.com/watch?v=vtPkZShrvXQ",
            resources: [
              {
                title: "Spring Boot Docs",
                url: "https://spring.io/projects/spring-boot",
              },
            ],
            order: 3,
          },
        ],
      },
    ],
  },
  {
    title: "Full-Stack Development Roadmap",
    description:
      "Complete guide to building end-to-end web applications with modern technologies.",
    modules: [
      {
        title: "Full-Stack Fundamentals",
        description:
          "Client-server architecture, deployment, and development workflow.",
        order: 1,
        topics: [
          {
            title: "Client-Server Architecture",
            description:
              "Understanding the full-stack architecture and communication patterns.",
            videoUrl: "https://www.youtube.com/watch?v=1zr2QJ5Cz8U",
            resources: [
              {
                title: "Full-Stack Architecture",
                url: "https://www.fullstack.cafe/blog/full-stack-developer-interview-questions",
              },
            ],
            order: 1,
          },
          {
            title: "Version Control & Git",
            description:
              "Git workflows, branching strategies, and collaboration.",
            videoUrl: "https://www.youtube.com/watch?v=SWYqp7iY_Tc",
            resources: [
              { title: "Git Documentation", url: "https://git-scm.com/doc" },
              { title: "GitHub Guides", url: "https://guides.github.com/" },
            ],
            order: 2,
          },
          {
            title: "Development Environment",
            description:
              "Setting up development tools, editors, and environments.",
            videoUrl: "https://www.youtube.com/watch?v=0akGd5JS3W4",
            resources: [
              {
                title: "VS Code Docs",
                url: "https://code.visualstudio.com/docs",
              },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "Modern Full-Stack Stacks",
        description: "MERN, MEAN, PERN, and other popular technology stacks.",
        order: 2,
        topics: [
          {
            title: "MERN Stack Deep Dive",
            description:
              "MongoDB, Express.js, React, Node.js - complete implementation.",
            videoUrl: "https://www.youtube.com/watch?v=7CqJlxBYj-M",
            resources: [
              {
                title: "MERN Stack Tutorial",
                url: "https://www.mongodb.com/languages/mern-stack-tutorial",
              },
            ],
            order: 1,
          },
          {
            title: "Next.js Full-Stack",
            description:
              "Server-side rendering, API routes, and full-stack Next.js.",
            videoUrl: "https://www.youtube.com/watch?v=mTz0GXj8NN0",
            resources: [
              { title: "Next.js Docs", url: "https://nextjs.org/docs" },
            ],
            order: 2,
          },
          {
            title: "Django + React Stack",
            description:
              "Python backend with Django REST framework and React frontend.",
            videoUrl: "https://www.youtube.com/watch?v=c-QsfbznSXI",
            resources: [
              {
                title: "Django REST Framework",
                url: "https://www.django-rest-framework.org/",
              },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "Testing & Quality Assurance",
        description: "Unit testing, integration testing, and CI/CD pipelines.",
        order: 3,
        topics: [
          {
            title: "Frontend Testing",
            description:
              "Component testing, E2E testing, and testing best practices.",
            videoUrl: "https://www.youtube.com/watch?v=T2sv8jXoP4s",
            resources: [
              { title: "Cypress Docs", url: "https://docs.cypress.io/" },
            ],
            order: 1,
          },
          {
            title: "Backend Testing",
            description:
              "API testing, database testing, and test-driven development.",
            videoUrl: "https://www.youtube.com/watch?v=1G5V5VLBsKw",
            resources: [
              {
                title: "Postman Testing",
                url: "https://learning.postman.com/docs/writing-scripts/test-scripts/",
              },
            ],
            order: 2,
          },
          {
            title: "CI/CD Pipelines",
            description: "GitHub Actions, Jenkins, and automated deployment.",
            videoUrl: "https://www.youtube.com/watch?v=R8_veQiYBjI",
            resources: [
              {
                title: "GitHub Actions",
                url: "https://docs.github.com/en/actions",
              },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "Production & Deployment",
        description:
          "Hosting, monitoring, scaling, and production best practices.",
        order: 4,
        topics: [
          {
            title: "Cloud Platforms",
            description:
              "AWS, Google Cloud, Azure, and cloud deployment strategies.",
            videoUrl: "https://www.youtube.com/watch?v=ubCNZRNjhyo",
            resources: [
              { title: "AWS Free Tier", url: "https://aws.amazon.com/free/" },
              {
                title: "Google Cloud Free",
                url: "https://cloud.google.com/free",
              },
            ],
            order: 1,
          },
          {
            title: "Monitoring & Logging",
            description:
              "Application monitoring, error tracking, and analytics.",
            videoUrl: "https://www.youtube.com/watch?v=7mFbJC9qNIE",
            resources: [
              { title: "Sentry Docs", url: "https://docs.sentry.io/" },
            ],
            order: 2,
          },
          {
            title: "Performance & Security",
            description:
              "Optimization, security headers, and production hardening.",
            videoUrl: "https://www.youtube.com/watch?v=0fONene3OIA",
            resources: [
              {
                title: "OWASP Security",
                url: "https://owasp.org/www-project-top-ten/",
              },
            ],
            order: 3,
          },
        ],
      },
    ],
  },
  // Mobile Development Roadmaps
  {
    title: "iOS Development Roadmap",
    description:
      "Build native iOS applications with Swift and Apple's development ecosystem.",
    modules: [
      {
        title: "Swift Fundamentals",
        description:
          "Learn Swift programming language and iOS development basics.",
        order: 1,
        topics: [
          {
            title: "Swift Programming",
            description:
              "Swift syntax, types, optionals, and basic programming concepts.",
            videoUrl: "https://www.youtube.com/watch?v=comQ1-x2a1Q",
            resources: [
              {
                title: "Swift Docs",
                url: "https://docs.swift.org/swift-book/",
              },
              {
                title: "Swift Playgrounds",
                url: "https://developer.apple.com/swift-playgrounds/",
              },
            ],
            order: 1,
          },
          {
            title: "Xcode & Development Tools",
            description: "Xcode IDE, Interface Builder, and debugging tools.",
            videoUrl: "https://www.youtube.com/watch?v=8XHCdkOcQQA",
            resources: [
              {
                title: "Xcode Guide",
                url: "https://developer.apple.com/xcode/",
              },
            ],
            order: 2,
          },
          {
            title: "UIKit Fundamentals",
            description: "Views, view controllers, and basic UI components.",
            videoUrl: "https://www.youtube.com/watch?v=HPVKmqzBaNQ",
            resources: [
              {
                title: "UIKit Documentation",
                url: "https://developer.apple.com/documentation/uikit",
              },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "iOS UI/UX Development",
        description: "Create beautiful and intuitive user interfaces for iOS.",
        order: 2,
        topics: [
          {
            title: "Auto Layout & Constraints",
            description: "Responsive layouts, size classes, and adaptive UI.",
            videoUrl: "https://www.youtube.com/watch?v=Xt7OqTQNK-Y",
            resources: [
              {
                title: "Auto Layout Guide",
                url: "https://developer.apple.com/library/archive/documentation/UserExperience/Conceptual/AutolayoutPG/index.html",
              },
            ],
            order: 1,
          },
          {
            title: "SwiftUI Introduction",
            description:
              "Declarative UI framework for building iOS interfaces.",
            videoUrl: "https://www.youtube.com/watch?v=F2ojC6TNwws",
            resources: [
              {
                title: "SwiftUI Docs",
                url: "https://developer.apple.com/xcode/swiftui/",
              },
            ],
            order: 2,
          },
          {
            title: "Animations & Gestures",
            description:
              "Core Animation, gesture recognizers, and interactive UI.",
            videoUrl: "https://www.youtube.com/watch?v=8XHCdkOcQQA",
            resources: [
              {
                title: "Core Animation",
                url: "https://developer.apple.com/documentation/quartzcore",
              },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "Data Management & Networking",
        description: "Core Data, networking, and data persistence in iOS.",
        order: 3,
        topics: [
          {
            title: "Core Data",
            description: "Object graph management and data persistence.",
            videoUrl: "https://www.youtube.com/watch?v=0fONene3OIA",
            resources: [
              {
                title: "Core Data Programming Guide",
                url: "https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/CoreData/index.html",
              },
            ],
            order: 1,
          },
          {
            title: "Networking with URLSession",
            description: "HTTP requests, REST APIs, and network communication.",
            videoUrl: "https://www.youtube.com/watch?v=8XHCdkOcQQA",
            resources: [
              {
                title: "URLSession",
                url: "https://developer.apple.com/documentation/foundation/urlsession",
              },
            ],
            order: 2,
          },
          {
            title: "JSON & API Integration",
            description: "Codable protocol, JSON parsing, and API consumption.",
            videoUrl: "https://www.youtube.com/watch?v=YY3bTxgxWss",
            resources: [
              {
                title: "Codable Protocol",
                url: "https://developer.apple.com/documentation/swift/codable",
              },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "Advanced iOS Development",
        description:
          "Push notifications, location services, and app store deployment.",
        order: 4,
        topics: [
          {
            title: "Push Notifications",
            description:
              "Local and remote notifications, UserNotifications framework.",
            videoUrl: "https://www.youtube.com/watch?v=8XHCdkOcQQA",
            resources: [
              {
                title: "UserNotifications",
                url: "https://developer.apple.com/documentation/usernotifications",
              },
            ],
            order: 1,
          },
          {
            title: "App Store & Distribution",
            description: "App Store Connect, TestFlight, and app deployment.",
            videoUrl: "https://www.youtube.com/watch?v=8XHCdkOcQQA",
            resources: [
              {
                title: "App Store Connect",
                url: "https://developer.apple.com/support/app-store-connect/",
              },
            ],
            order: 2,
          },
          {
            title: "Performance & Optimization",
            description:
              "Memory management, performance profiling, and optimization.",
            videoUrl: "https://www.youtube.com/watch?v=8XHCdkOcQQA",
            resources: [
              {
                title: "Instruments User Guide",
                url: "https://developer.apple.com/library/archive/documentation/DeveloperTools/Conceptual/InstrumentsUserGuide/index.html",
              },
            ],
            order: 3,
          },
        ],
      },
    ],
  },
  {
    title: "Android Development Roadmap",
    description:
      "Build native Android applications with Kotlin and Android development tools.",
    modules: [
      {
        title: "Kotlin & Android Basics",
        description:
          "Learn Kotlin programming and Android development fundamentals.",
        order: 1,
        topics: [
          {
            title: "Kotlin Programming",
            description:
              "Kotlin syntax, null safety, data classes, and modern language features.",
            videoUrl: "https://www.youtube.com/watch?v=F9UC9DY-vIU",
            resources: [
              { title: "Kotlin Docs", url: "https://kotlinlang.org/docs/" },
              {
                title: "Kotlin Koans",
                url: "https://play.kotlinlang.org/koans",
              },
            ],
            order: 1,
          },
          {
            title: "Android Studio & Tools",
            description:
              "Android Studio IDE, emulator, and development environment setup.",
            videoUrl: "https://www.youtube.com/watch?v=0fONene3OIA",
            resources: [
              {
                title: "Android Studio",
                url: "https://developer.android.com/studio",
              },
            ],
            order: 2,
          },
          {
            title: "Android Components",
            description:
              "Activities, fragments, intents, and Android app architecture.",
            videoUrl: "https://www.youtube.com/watch?v=0fONene3OIA",
            resources: [
              {
                title: "Android Components",
                url: "https://developer.android.com/guide/components",
              },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "UI/UX Development",
        description:
          "Create beautiful Android user interfaces with modern design patterns.",
        order: 2,
        topics: [
          {
            title: "Layouts & Views",
            description: "ConstraintLayout, RecyclerView, and custom views.",
            videoUrl: "https://www.youtube.com/watch?v=0fONene3OIA",
            resources: [
              {
                title: "Layouts",
                url: "https://developer.android.com/develop/ui/views/layout/declaring-layout",
              },
            ],
            order: 1,
          },
          {
            title: "Material Design",
            description:
              "Material Design components, themes, and design system.",
            videoUrl: "https://www.youtube.com/watch?v=0fONene3OIA",
            resources: [
              { title: "Material Design", url: "https://material.io/design" },
            ],
            order: 2,
          },
          {
            title: "Jetpack Compose",
            description: "Modern declarative UI toolkit for Android.",
            videoUrl: "https://www.youtube.com/watch?v=0fONene3OIA",
            resources: [
              {
                title: "Jetpack Compose",
                url: "https://developer.android.com/jetpack/compose",
              },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "Data & Networking",
        description:
          "Room database, Retrofit networking, and data persistence.",
        order: 3,
        topics: [
          {
            title: "Room Database",
            description:
              "SQLite abstraction, entities, DAOs, and database operations.",
            videoUrl: "https://www.youtube.com/watch?v=0fONene3OIA",
            resources: [
              {
                title: "Room Persistence",
                url: "https://developer.android.com/training/data-storage/room",
              },
            ],
            order: 1,
          },
          {
            title: "Networking with Retrofit",
            description:
              "HTTP client, REST API integration, and network operations.",
            videoUrl: "https://www.youtube.com/watch?v=0fONene3OIA",
            resources: [
              { title: "Retrofit", url: "https://square.github.io/retrofit/" },
            ],
            order: 2,
          },
          {
            title: "WorkManager & Background Tasks",
            description:
              "Background processing, scheduling, and task management.",
            videoUrl: "https://www.youtube.com/watch?v=0fONene3OIA",
            resources: [
              {
                title: "WorkManager",
                url: "https://developer.android.com/topic/libraries/architecture/workmanager",
              },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "Advanced Android Development",
        description:
          "Architecture components, testing, and Google Play deployment.",
        order: 4,
        topics: [
          {
            title: "MVVM & Architecture Components",
            description:
              "ViewModel, LiveData, and modern Android architecture.",
            videoUrl: "https://www.youtube.com/watch?v=0fONene3OIA",
            resources: [
              {
                title: "Architecture Components",
                url: "https://developer.android.com/topic/libraries/architecture",
              },
            ],
            order: 1,
          },
          {
            title: "Testing & Quality Assurance",
            description: "Unit testing, instrumentation testing, and CI/CD.",
            videoUrl: "https://www.youtube.com/watch?v=0fONene3OIA",
            resources: [
              {
                title: "Android Testing",
                url: "https://developer.android.com/training/testing",
              },
            ],
            order: 2,
          },
          {
            title: "Google Play Store",
            description:
              "App publishing, monetization, and store optimization.",
            videoUrl: "https://www.youtube.com/watch?v=0fONene3OIA",
            resources: [
              { title: "Google Play", url: "https://play.google.com/console/" },
            ],
            order: 3,
          },
        ],
      },
    ],
  },
  {
    title: "Cross-Platform Mobile Development",
    description:
      "Build mobile apps for iOS and Android using React Native and Flutter.",
    modules: [
      {
        title: "React Native Fundamentals",
        description:
          "Learn React Native for cross-platform mobile development.",
        order: 1,
        topics: [
          {
            title: "React Native Introduction",
            description:
              "React Native setup, JSX, components, and mobile development basics.",
            videoUrl: "https://www.youtube.com/watch?v=0-S5a0eXPoc",
            resources: [
              {
                title: "React Native Docs",
                url: "https://reactnative.dev/docs/getting-started",
              },
              { title: "Expo Docs", url: "https://docs.expo.dev/" },
            ],
            order: 1,
          },
          {
            title: "React Native Components",
            description:
              "Core components, styling, navigation, and state management.",
            videoUrl: "https://www.youtube.com/watch?v=0-S5a0eXPoc",
            resources: [
              {
                title: "React Native Components",
                url: "https://reactnative.dev/docs/components-and-apis",
              },
            ],
            order: 2,
          },
          {
            title: "Native Modules & APIs",
            description: "Camera, location, storage, and device APIs.",
            videoUrl: "https://www.youtube.com/watch?v=0-S5a0eXPoc",
            resources: [
              {
                title: "React Native APIs",
                url: "https://reactnative.dev/docs/accessibilityinfo",
              },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "Flutter & Dart",
        description: "Learn Flutter framework and Dart programming language.",
        order: 2,
        topics: [
          {
            title: "Dart Programming",
            description:
              "Dart syntax, object-oriented programming, and async programming.",
            videoUrl: "https://www.youtube.com/watch?v=5rtujD_LTdk",
            resources: [
              {
                title: "Dart Language",
                url: "https://dart.dev/guides/language/language-tour",
              },
              { title: "DartPad", url: "https://dartpad.dev/" },
            ],
            order: 1,
          },
          {
            title: "Flutter Widgets",
            description:
              "Material Design, Cupertino widgets, and custom widgets.",
            videoUrl: "https://www.youtube.com/watch?v=5rtujD_LTdk",
            resources: [
              {
                title: "Flutter Widgets",
                url: "https://flutter.dev/docs/development/ui/widgets",
              },
            ],
            order: 2,
          },
          {
            title: "State Management",
            description:
              "Provider, Riverpod, Bloc, and state management patterns.",
            videoUrl: "https://www.youtube.com/watch?v=5rtujD_LTdk",
            resources: [
              {
                title: "Flutter State Management",
                url: "https://flutter.dev/docs/development/data-and-backend/state-mgmt",
              },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "Cross-Platform Architecture",
        description:
          "Navigation, data persistence, and platform-specific code.",
        order: 3,
        topics: [
          {
            title: "Navigation & Routing",
            description:
              "React Navigation, Flutter Navigator, and routing patterns.",
            videoUrl: "https://www.youtube.com/watch?v=0-S5a0eXPoc",
            resources: [
              {
                title: "React Navigation",
                url: "https://reactnavigation.org/",
              },
            ],
            order: 1,
          },
          {
            title: "Data Storage",
            description: "AsyncStorage, SQLite, and cloud storage solutions.",
            videoUrl: "https://www.youtube.com/watch?v=0-S5a0eXPoc",
            resources: [
              {
                title: "AsyncStorage",
                url: "https://react-native-async-storage.github.io/async-storage/",
              },
            ],
            order: 2,
          },
          {
            title: "Platform Integration",
            description: "Native modules, platform channels, and code sharing.",
            videoUrl: "https://www.youtube.com/watch?v=5rtujD_LTdk",
            resources: [
              {
                title: "Platform Channels",
                url: "https://flutter.dev/docs/development/platform-integration/platform-channels",
              },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "Deployment & Publishing",
        description: "Build, test, and publish apps to app stores.",
        order: 4,
        topics: [
          {
            title: "Testing & Debugging",
            description:
              "Unit testing, integration testing, and debugging tools.",
            videoUrl: "https://www.youtube.com/watch?v=0-S5a0eXPoc",
            resources: [
              {
                title: "React Native Testing",
                url: "https://reactnative.dev/docs/testing-overview",
              },
            ],
            order: 1,
          },
          {
            title: "Build & Release",
            description: "Fastlane, CodePush, and automated deployment.",
            videoUrl: "https://www.youtube.com/watch?v=0-S5a0eXPoc",
            resources: [{ title: "Fastlane", url: "https://fastlane.tools/" }],
            order: 2,
          },
          {
            title: "App Store Deployment",
            description:
              "Publishing to Google Play, App Store, and app store optimization.",
            videoUrl: "https://www.youtube.com/watch?v=0-S5a0eXPoc",
            resources: [
              {
                title: "App Store Guidelines",
                url: "https://developer.apple.com/app-store/review/guidelines/",
              },
            ],
            order: 3,
          },
        ],
      },
    ],
  },
  // Data Science & Machine Learning
  {
    title: "Data Science Fundamentals",
    description:
      "Master data analysis, statistics, and data visualization with Python.",
    modules: [
      {
        title: "Python for Data Science",
        description:
          "Python programming essentials for data science and analysis.",
        order: 1,
        topics: [
          {
            title: "Python Data Science Stack",
            description: "NumPy, Pandas, Matplotlib, and Jupyter notebooks.",
            videoUrl: "https://www.youtube.com/watch?v=GPVsHOlRBBI",
            resources: [
              { title: "NumPy Docs", url: "https://numpy.org/doc/" },
              { title: "Pandas Docs", url: "https://pandas.pydata.org/docs/" },
            ],
            order: 1,
          },
          {
            title: "Data Manipulation",
            description:
              "Data cleaning, transformation, and preprocessing with Pandas.",
            videoUrl: "https://www.youtube.com/watch?v=vmEHCJofslg",
            resources: [
              {
                title: "Pandas Tutorials",
                url: "https://pandas.pydata.org/docs/getting_started/index.html",
              },
            ],
            order: 2,
          },
          {
            title: "Data Visualization",
            description:
              "Matplotlib, Seaborn, and Plotly for data visualization.",
            videoUrl: "https://www.youtube.com/watch?v=0P7QnIQDBJY",
            resources: [
              { title: "Matplotlib", url: "https://matplotlib.org/" },
              { title: "Seaborn", url: "https://seaborn.pydata.org/" },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "Statistics & Mathematics",
        description:
          "Statistical analysis, probability, and mathematical foundations.",
        order: 2,
        topics: [
          {
            title: "Descriptive Statistics",
            description:
              "Mean, median, variance, distributions, and data summarization.",
            videoUrl: "https://www.youtube.com/watch?v=uhxtUt_-GyM",
            resources: [
              {
                title: "Statistics Fundamentals",
                url: "https://www.khanacademy.org/math/statistics-probability",
              },
            ],
            order: 1,
          },
          {
            title: "Inferential Statistics",
            description:
              "Hypothesis testing, confidence intervals, and statistical inference.",
            videoUrl: "https://www.youtube.com/watch?v=0zZYBALbZgg",
            resources: [
              {
                title: "Statistical Inference",
                url: "https://www.coursera.org/learn/statistical-inference",
              },
            ],
            order: 2,
          },
          {
            title: "Linear Algebra & Calculus",
            description:
              "Vectors, matrices, derivatives, and optimization fundamentals.",
            videoUrl: "https://www.youtube.com/watch?v=fNk_zzaMoSs",
            resources: [
              {
                title: "Linear Algebra",
                url: "https://www.khanacademy.org/math/linear-algebra",
              },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "Data Analysis & SQL",
        description: "Advanced data analysis techniques and database querying.",
        order: 3,
        topics: [
          {
            title: "Exploratory Data Analysis",
            description:
              "Data exploration, outlier detection, and feature engineering.",
            videoUrl: "https://www.youtube.com/watch?v=xi0vhXFPegw",
            resources: [
              {
                title: "EDA Guide",
                url: "https://www.kaggle.com/learn/data-visualization",
              },
            ],
            order: 1,
          },
          {
            title: "SQL for Data Science",
            description:
              "Advanced SQL queries, window functions, and database design.",
            videoUrl: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
            resources: [{ title: "SQLZoo", url: "https://sqlzoo.net/" }],
            order: 2,
          },
          {
            title: "Big Data Tools",
            description: "Apache Spark, Hadoop, and distributed computing.",
            videoUrl: "https://www.youtube.com/watch?v=1a4cjKb9eOA",
            resources: [
              {
                title: "Apache Spark",
                url: "https://spark.apache.org/docs/latest/",
              },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "Data Science Tools & Workflow",
        description: "Jupyter, Git, Docker, and data science best practices.",
        order: 4,
        topics: [
          {
            title: "Jupyter Ecosystem",
            description:
              "Jupyter notebooks, JupyterLab, and interactive computing.",
            videoUrl: "https://www.youtube.com/watch?v=HW29067qVWk",
            resources: [
              {
                title: "Jupyter Docs",
                url: "https://jupyter.org/documentation",
              },
            ],
            order: 1,
          },
          {
            title: "Version Control for Data",
            description: "Git, DVC, and data versioning best practices.",
            videoUrl: "https://www.youtube.com/watch?v=SWYqp7iY_Tc",
            resources: [{ title: "DVC", url: "https://dvc.org/" }],
            order: 2,
          },
          {
            title: "MLOps Fundamentals",
            description:
              "Model deployment, monitoring, and production ML systems.",
            videoUrl: "https://www.youtube.com/watch?v=1a4cjKb9eOA",
            resources: [{ title: "MLOps Guide", url: "https://ml-ops.org/" }],
            order: 3,
          },
        ],
      },
    ],
  },
  {
    title: "Machine Learning Engineering",
    description:
      "Build and deploy machine learning models with modern tools and frameworks.",
    modules: [
      {
        title: "Machine Learning Fundamentals",
        description: "Core ML concepts, algorithms, and model evaluation.",
        order: 1,
        topics: [
          {
            title: "Supervised Learning",
            description:
              "Regression, classification, and supervised learning algorithms.",
            videoUrl: "https://www.youtube.com/watch?v=4b4MUYve_U8",
            resources: [
              { title: "Scikit-learn", url: "https://scikit-learn.org/" },
              {
                title: "ML Course",
                url: "https://www.coursera.org/learn/machine-learning",
              },
            ],
            order: 1,
          },
          {
            title: "Unsupervised Learning",
            description:
              "Clustering, dimensionality reduction, and unsupervised techniques.",
            videoUrl: "https://www.youtube.com/watch?v=4b4MUYve_U8",
            resources: [
              {
                title: "Unsupervised Learning",
                url: "https://www.coursera.org/learn/unsupervised-learning-recommenders-reinforcement-learning",
              },
            ],
            order: 2,
          },
          {
            title: "Model Evaluation",
            description:
              "Cross-validation, metrics, bias-variance tradeoff, and overfitting.",
            videoUrl: "https://www.youtube.com/watch?v=4b4MUYve_U8",
            resources: [
              {
                title: "Model Evaluation",
                url: "https://scikit-learn.org/stable/modules/model_evaluation.html",
              },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "Deep Learning",
        description:
          "Neural networks, CNNs, RNNs, and deep learning frameworks.",
        order: 2,
        topics: [
          {
            title: "Neural Networks Basics",
            description:
              "Perceptrons, backpropagation, and feedforward networks.",
            videoUrl: "https://www.youtube.com/watch?v=aircAruvnKk",
            resources: [
              {
                title: "Deep Learning Book",
                url: "https://www.deeplearningbook.org/",
              },
            ],
            order: 1,
          },
          {
            title: "TensorFlow & Keras",
            description: "Building neural networks with TensorFlow and Keras.",
            videoUrl: "https://www.youtube.com/watch?v=tPYj3fFJGjk",
            resources: [
              { title: "TensorFlow", url: "https://www.tensorflow.org/" },
            ],
            order: 2,
          },
          {
            title: "PyTorch Fundamentals",
            description: "Dynamic computation graphs and PyTorch ecosystem.",
            videoUrl: "https://www.youtube.com/watch?v=IC0_FRiX-sw",
            resources: [{ title: "PyTorch", url: "https://pytorch.org/" }],
            order: 3,
          },
        ],
      },
      {
        title: "Computer Vision & NLP",
        description:
          "Image processing, text analysis, and specialized ML domains.",
        order: 3,
        topics: [
          {
            title: "Computer Vision",
            description:
              "OpenCV, image classification, object detection, and segmentation.",
            videoUrl: "https://www.youtube.com/watch?v=oXlwWbU8l2o",
            resources: [{ title: "OpenCV", url: "https://opencv.org/" }],
            order: 1,
          },
          {
            title: "Natural Language Processing",
            description:
              "Text preprocessing, sentiment analysis, and language models.",
            videoUrl: "https://www.youtube.com/watch?v=8S2xBy4oHkc",
            resources: [{ title: "NLTK", url: "https://www.nltk.org/" }],
            order: 2,
          },
          {
            title: "Transformers & BERT",
            description: "Attention mechanisms, transformers, and modern NLP.",
            videoUrl: "https://www.youtube.com/watch?v=SZorAJ4I-sA",
            resources: [
              { title: "Hugging Face", url: "https://huggingface.co/" },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "ML Engineering & Deployment",
        description: "Model serving, monitoring, and production ML systems.",
        order: 4,
        topics: [
          {
            title: "Model Deployment",
            description:
              "Flask/FastAPI APIs, Docker containers, and cloud deployment.",
            videoUrl: "https://www.youtube.com/watch?v=1a4cjKb9eOA",
            resources: [{ title: "MLflow", url: "https://mlflow.org/" }],
            order: 1,
          },
          {
            title: "Model Monitoring",
            description:
              "Performance monitoring, drift detection, and A/B testing.",
            videoUrl: "https://www.youtube.com/watch?v=1a4cjKb9eOA",
            resources: [
              { title: "Evidently AI", url: "https://evidentlyai.com/" },
            ],
            order: 2,
          },
          {
            title: "Scalable ML Systems",
            description: "Distributed training, model optimization, and MLOps.",
            videoUrl: "https://www.youtube.com/watch?v=1a4cjKb9eOA",
            resources: [
              { title: "Kubeflow", url: "https://www.kubeflow.org/" },
            ],
            order: 3,
          },
        ],
      },
    ],
  },
  // DevOps & Cloud Computing
  {
    title: "DevOps Engineering",
    description:
      "Master DevOps practices, CI/CD, infrastructure as code, and automation.",
    modules: [
      {
        title: "DevOps Fundamentals",
        description:
          "Version control, agile methodologies, and DevOps culture.",
        order: 1,
        topics: [
          {
            title: "Version Control Systems",
            description:
              "Git workflows, branching strategies, and GitHub/GitLab.",
            videoUrl: "https://www.youtube.com/watch?v=SWYqp7iY_Tc",
            resources: [
              { title: "Git Documentation", url: "https://git-scm.com/doc" },
              { title: "GitHub Guides", url: "https://guides.github.com/" },
            ],
            order: 1,
          },
          {
            title: "Agile & DevOps Culture",
            description:
              "Agile methodologies, continuous improvement, and team collaboration.",
            videoUrl: "https://www.youtube.com/watch?v=0yWAtQ6wYNM",
            resources: [
              {
                title: "DevOps Guide",
                url: "https://www.atlassian.com/devops",
              },
            ],
            order: 2,
          },
          {
            title: "Linux System Administration",
            description:
              "Command line, shell scripting, and system management.",
            videoUrl: "https://www.youtube.com/watch?v=sWbUDq4S6Y8",
            resources: [
              { title: "Linux Journey", url: "https://linuxjourney.com/" },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "CI/CD Pipelines",
        description: "Automated testing, building, and deployment pipelines.",
        order: 2,
        topics: [
          {
            title: "Continuous Integration",
            description:
              "Automated testing, code quality, and integration practices.",
            videoUrl: "https://www.youtube.com/watch?v=1a4cjKb9eOA",
            resources: [
              { title: "Jenkins Docs", url: "https://www.jenkins.io/doc/" },
            ],
            order: 1,
          },
          {
            title: "Continuous Deployment",
            description:
              "Automated deployment, blue-green deployments, and canary releases.",
            videoUrl: "https://www.youtube.com/watch?v=1a4cjKb9eOA",
            resources: [
              {
                title: "GitHub Actions",
                url: "https://docs.github.com/en/actions",
              },
            ],
            order: 2,
          },
          {
            title: "Pipeline Tools",
            description: "Jenkins, GitLab CI, GitHub Actions, and CircleCI.",
            videoUrl: "https://www.youtube.com/watch?v=1a4cjKb9eOA",
            resources: [
              { title: "CircleCI Docs", url: "https://circleci.com/docs/" },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "Infrastructure as Code",
        description: "Terraform, Ansible, and infrastructure automation.",
        order: 3,
        topics: [
          {
            title: "Configuration Management",
            description:
              "Ansible, Puppet, and Chef for configuration automation.",
            videoUrl: "https://www.youtube.com/watch?v=1a4cjKb9eOA",
            resources: [
              { title: "Ansible Docs", url: "https://docs.ansible.com/" },
            ],
            order: 1,
          },
          {
            title: "Infrastructure as Code",
            description:
              "Terraform, CloudFormation, and infrastructure provisioning.",
            videoUrl: "https://www.youtube.com/watch?v=1a4cjKb9eOA",
            resources: [
              { title: "Terraform Docs", url: "https://www.terraform.io/docs" },
            ],
            order: 2,
          },
          {
            title: "Container Orchestration",
            description: "Kubernetes, Docker Swarm, and container management.",
            videoUrl: "https://www.youtube.com/watch?v=1a4cjKb9eOA",
            resources: [
              { title: "Kubernetes Docs", url: "https://kubernetes.io/docs/" },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "Monitoring & Observability",
        description:
          "System monitoring, logging, and performance optimization.",
        order: 4,
        topics: [
          {
            title: "Monitoring Tools",
            description: "Prometheus, Grafana, and metrics collection.",
            videoUrl: "https://www.youtube.com/watch?v=1a4cjKb9eOA",
            resources: [
              { title: "Prometheus", url: "https://prometheus.io/docs/" },
            ],
            order: 1,
          },
          {
            title: "Logging & Alerting",
            description: "ELK stack, Splunk, and log aggregation systems.",
            videoUrl: "https://www.youtube.com/watch?v=1a4cjKb9eOA",
            resources: [
              {
                title: "ELK Stack",
                url: "https://www.elastic.co/elastic-stack",
              },
            ],
            order: 2,
          },
          {
            title: "Performance Optimization",
            description: "Load testing, profiling, and system optimization.",
            videoUrl: "https://www.youtube.com/watch?v=1a4cjKb9eOA",
            resources: [
              { title: "Performance Testing", url: "https://k6.io/docs/" },
            ],
            order: 3,
          },
        ],
      },
    ],
  },
  {
    title: "Cloud Computing",
    description:
      "Master cloud platforms, services, and cloud-native development.",
    modules: [
      {
        title: "Cloud Fundamentals",
        description: "Cloud computing concepts, services, and architecture.",
        order: 1,
        topics: [
          {
            title: "Cloud Computing Basics",
            description: "IaaS, PaaS, SaaS, and cloud service models.",
            videoUrl: "https://www.youtube.com/watch?v=M988_fsOSWo",
            resources: [
              {
                title: "AWS Cloud Practitioner",
                url: "https://aws.amazon.com/certification/certified-cloud-practitioner/",
              },
            ],
            order: 1,
          },
          {
            title: "AWS Fundamentals",
            description: "EC2, S3, IAM, and core AWS services.",
            videoUrl: "https://www.youtube.com/watch?v=ubCNZRNjhyo",
            resources: [
              { title: "AWS Free Tier", url: "https://aws.amazon.com/free/" },
            ],
            order: 2,
          },
          {
            title: "Google Cloud Platform",
            description: "Compute Engine, Cloud Storage, and GCP services.",
            videoUrl: "https://www.youtube.com/watch?v=ubCNZRNjhyo",
            resources: [
              {
                title: "Google Cloud Free",
                url: "https://cloud.google.com/free",
              },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "Cloud Architecture",
        description:
          "Scalable architecture, microservices, and serverless computing.",
        order: 2,
        topics: [
          {
            title: "Serverless Computing",
            description:
              "AWS Lambda, Google Cloud Functions, and serverless architecture.",
            videoUrl: "https://www.youtube.com/watch?v=ubCNZRNjhyo",
            resources: [
              {
                title: "Serverless Framework",
                url: "https://www.serverless.com/",
              },
            ],
            order: 1,
          },
          {
            title: "Microservices on Cloud",
            description:
              "Container orchestration, service mesh, and cloud-native apps.",
            videoUrl: "https://www.youtube.com/watch?v=ubCNZRNjhyo",
            resources: [{ title: "Istio", url: "https://istio.io/" }],
            order: 2,
          },
          {
            title: "Cloud Databases",
            description:
              "RDS, DynamoDB, Cloud SQL, and managed database services.",
            videoUrl: "https://www.youtube.com/watch?v=ubCNZRNjhyo",
            resources: [
              { title: "AWS RDS", url: "https://aws.amazon.com/rds/" },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "Cloud DevOps",
        description: "Infrastructure as code, CI/CD, and cloud automation.",
        order: 3,
        topics: [
          {
            title: "CloudFormation & Terraform",
            description:
              "Infrastructure as code with AWS and multi-cloud tools.",
            videoUrl: "https://www.youtube.com/watch?v=ubCNZRNjhyo",
            resources: [
              {
                title: "AWS CloudFormation",
                url: "https://aws.amazon.com/cloudformation/",
              },
            ],
            order: 1,
          },
          {
            title: "Cloud CI/CD",
            description:
              "AWS CodePipeline, Google Cloud Build, and cloud-native CI/CD.",
            videoUrl: "https://www.youtube.com/watch?v=ubCNZRNjhyo",
            resources: [
              {
                title: "AWS CodePipeline",
                url: "https://aws.amazon.com/codepipeline/",
              },
            ],
            order: 2,
          },
          {
            title: "Cloud Security",
            description:
              "IAM, VPC, security groups, and cloud security best practices.",
            videoUrl: "https://www.youtube.com/watch?v=ubCNZRNjhyo",
            resources: [
              {
                title: "AWS Security",
                url: "https://aws.amazon.com/security/",
              },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "Advanced Cloud Topics",
        description: "Multi-cloud, hybrid cloud, and cloud cost optimization.",
        order: 4,
        topics: [
          {
            title: "Multi-Cloud Strategies",
            description:
              "Multi-cloud architecture, vendor lock-in avoidance, and cloud migration.",
            videoUrl: "https://www.youtube.com/watch?v=ubCNZRNjhyo",
            resources: [
              {
                title: "Multi-Cloud Guide",
                url: "https://cloud.google.com/learn/what-is-multicloud",
              },
            ],
            order: 1,
          },
          {
            title: "Cloud Cost Optimization",
            description:
              "Cost monitoring, reserved instances, and cloud financial management.",
            videoUrl: "https://www.youtube.com/watch?v=ubCNZRNjhyo",
            resources: [
              {
                title: "AWS Cost Explorer",
                url: "https://aws.amazon.com/aws-cost-management/aws-cost-explorer/",
              },
            ],
            order: 2,
          },
          {
            title: "Cloud-Native Development",
            description:
              "Kubernetes, service mesh, and cloud-native application development.",
            videoUrl: "https://www.youtube.com/watch?v=ubCNZRNjhyo",
            resources: [{ title: "CNCF", url: "https://www.cncf.io/" }],
            order: 3,
          },
        ],
      },
    ],
  },
  // Databases
  {
    title: "SQL Databases",
    description:
      "Master relational databases, SQL, and database design principles.",
    modules: [
      {
        title: "SQL Fundamentals",
        description:
          "Basic SQL queries, database concepts, and relational theory.",
        order: 1,
        topics: [
          {
            title: "Database Concepts",
            description: "Tables, relationships, keys, and normalization.",
            videoUrl: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
            resources: [
              {
                title: "Database Design",
                url: "https://www.lucidchart.com/pages/database-diagram/database-design",
              },
            ],
            order: 1,
          },
          {
            title: "Basic SQL Queries",
            description: "SELECT, INSERT, UPDATE, DELETE statements.",
            videoUrl: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
            resources: [{ title: "SQLZoo", url: "https://sqlzoo.net/" }],
            order: 2,
          },
          {
            title: "Joins & Subqueries",
            description:
              "INNER JOIN, LEFT JOIN, subqueries, and complex queries.",
            videoUrl: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
            resources: [
              {
                title: "SQL Joins",
                url: "https://www.w3schools.com/sql/sql_join.asp",
              },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "Advanced SQL",
        description: "Stored procedures, triggers, and advanced SQL features.",
        order: 2,
        topics: [
          {
            title: "Stored Procedures",
            description: "Creating and using stored procedures and functions.",
            videoUrl: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
            resources: [
              {
                title: "Stored Procedures",
                url: "https://www.w3schools.com/sql/sql_stored_procedures.asp",
              },
            ],
            order: 1,
          },
          {
            title: "Indexes & Performance",
            description:
              "Database indexing, query optimization, and performance tuning.",
            videoUrl: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
            resources: [
              {
                title: "Database Indexing",
                url: "https://use-the-index-luke.com/",
              },
            ],
            order: 2,
          },
          {
            title: "Transactions & ACID",
            description:
              "Transaction management, concurrency, and ACID properties.",
            videoUrl: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
            resources: [
              {
                title: "ACID Properties",
                url: "https://en.wikipedia.org/wiki/ACID",
              },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "Database Administration",
        description: "Database management, backup, and security.",
        order: 3,
        topics: [
          {
            title: "PostgreSQL Administration",
            description: "PostgreSQL setup, configuration, and management.",
            videoUrl: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
            resources: [
              {
                title: "PostgreSQL Docs",
                url: "https://www.postgresql.org/docs/",
              },
            ],
            order: 1,
          },
          {
            title: "MySQL Administration",
            description: "MySQL setup, optimization, and maintenance.",
            videoUrl: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
            resources: [
              { title: "MySQL Docs", url: "https://dev.mysql.com/doc/" },
            ],
            order: 2,
          },
          {
            title: "Database Security",
            description:
              "Access control, encryption, and security best practices.",
            videoUrl: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
            resources: [
              {
                title: "Database Security",
                url: "https://owasp.org/www-project-database-security/",
              },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "ORM & Application Integration",
        description: "Object-relational mapping and database integration.",
        order: 4,
        topics: [
          {
            title: "SQLAlchemy",
            description:
              "Python ORM for database operations and query building.",
            videoUrl: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
            resources: [
              { title: "SQLAlchemy", url: "https://www.sqlalchemy.org/" },
            ],
            order: 1,
          },
          {
            title: "Entity Framework",
            description: ".NET ORM for database access and LINQ queries.",
            videoUrl: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
            resources: [
              {
                title: "Entity Framework",
                url: "https://docs.microsoft.com/en-us/ef/",
              },
            ],
            order: 2,
          },
          {
            title: "Database Migration",
            description:
              "Schema versioning, migration tools, and change management.",
            videoUrl: "https://www.youtube.com/watch?v=HXV3zeQKqGY",
            resources: [{ title: "Flyway", url: "https://flywaydb.org/" }],
            order: 3,
          },
        ],
      },
    ],
  },
  {
    title: "NoSQL Databases",
    description:
      "Master NoSQL databases including MongoDB, Redis, and Cassandra.",
    modules: [
      {
        title: "NoSQL Fundamentals",
        description: "NoSQL concepts, CAP theorem, and database types.",
        order: 1,
        topics: [
          {
            title: "NoSQL Concepts",
            description:
              "Document, key-value, column-family, and graph databases.",
            videoUrl: "https://www.youtube.com/watch?v=c2M-rlkkT5o",
            resources: [
              {
                title: "NoSQL Distilled",
                url: "https://martinfowler.com/books/nosql.html",
              },
            ],
            order: 1,
          },
          {
            title: "CAP Theorem",
            description:
              "Consistency, Availability, Partition tolerance trade-offs.",
            videoUrl: "https://www.youtube.com/watch?v=c2M-rlkkT5o",
            resources: [
              {
                title: "CAP Theorem",
                url: "https://en.wikipedia.org/wiki/CAP_theorem",
              },
            ],
            order: 2,
          },
          {
            title: "Data Modeling",
            description: "NoSQL data modeling patterns and best practices.",
            videoUrl: "https://www.youtube.com/watch?v=c2M-rlkkT5o",
            resources: [
              {
                title: "NoSQL Data Modeling",
                url: "https://highlyscalable.wordpress.com/2012/03/01/nosql-data-modeling-techniques/",
              },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "MongoDB Deep Dive",
        description: "Document database operations, aggregation, and indexing.",
        order: 2,
        topics: [
          {
            title: "MongoDB CRUD Operations",
            description: "Create, read, update, delete operations in MongoDB.",
            videoUrl: "https://www.youtube.com/watch?v=c2M-rlkkT5o",
            resources: [
              {
                title: "MongoDB CRUD",
                url: "https://docs.mongodb.com/manual/crud/",
              },
            ],
            order: 1,
          },
          {
            title: "MongoDB Aggregation",
            description:
              "Aggregation pipeline, $match, $group, and data processing.",
            videoUrl: "https://www.youtube.com/watch?v=c2M-rlkkT5o",
            resources: [
              {
                title: "Aggregation Pipeline",
                url: "https://docs.mongodb.com/manual/aggregation/",
              },
            ],
            order: 2,
          },
          {
            title: "MongoDB Indexing",
            description:
              "Index types, compound indexes, and query optimization.",
            videoUrl: "https://www.youtube.com/watch?v=c2M-rlkkT5o",
            resources: [
              {
                title: "MongoDB Indexes",
                url: "https://docs.mongodb.com/manual/indexes/",
              },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "Redis & Key-Value Stores",
        description: "In-memory data structures and caching with Redis.",
        order: 3,
        topics: [
          {
            title: "Redis Data Types",
            description: "Strings, hashes, lists, sets, and sorted sets.",
            videoUrl: "https://www.youtube.com/watch?v=c2M-rlkkT5o",
            resources: [
              { title: "Redis Docs", url: "https://redis.io/documentation" },
            ],
            order: 1,
          },
          {
            title: "Redis Persistence",
            description: "RDB snapshots, AOF, and data durability options.",
            videoUrl: "https://www.youtube.com/watch?v=c2M-rlkkT5o",
            resources: [
              {
                title: "Redis Persistence",
                url: "https://redis.io/topics/persistence",
              },
            ],
            order: 2,
          },
          {
            title: "Redis Clustering",
            description: "Redis Cluster, Sentinel, and high availability.",
            videoUrl: "https://www.youtube.com/watch?v=c2M-rlkkT5o",
            resources: [
              {
                title: "Redis Cluster",
                url: "https://redis.io/topics/cluster-tutorial",
              },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "Advanced NoSQL Topics",
        description:
          "Cassandra, Elasticsearch, and specialized NoSQL databases.",
        order: 4,
        topics: [
          {
            title: "Apache Cassandra",
            description:
              "Wide-column store, CQL, and distributed architecture.",
            videoUrl: "https://www.youtube.com/watch?v=c2M-rlkkT5o",
            resources: [
              {
                title: "Cassandra Docs",
                url: "https://cassandra.apache.org/doc/latest/",
              },
            ],
            order: 1,
          },
          {
            title: "Elasticsearch",
            description: "Full-text search, indexing, and analytics engine.",
            videoUrl: "https://www.youtube.com/watch?v=c2M-rlkkT5o",
            resources: [
              {
                title: "Elasticsearch",
                url: "https://www.elastic.co/guide/en/elasticsearch/reference/current/index.html",
              },
            ],
            order: 2,
          },
          {
            title: "Graph Databases",
            description:
              "Neo4j, Cypher query language, and graph data modeling.",
            videoUrl: "https://www.youtube.com/watch?v=c2M-rlkkT5o",
            resources: [{ title: "Neo4j", url: "https://neo4j.com/docs/" }],
            order: 3,
          },
        ],
      },
    ],
  },
  // System Design & Architecture
  {
    title: "System Design Fundamentals",
    description:
      "Learn to design scalable, reliable, and maintainable software systems.",
    modules: [
      {
        title: "Design Principles",
        description:
          "SOLID principles, design patterns, and architectural patterns.",
        order: 1,
        topics: [
          {
            title: "SOLID Principles",
            description:
              "Single responsibility, open-closed, Liskov substitution, interface segregation, dependency inversion.",
            videoUrl: "https://www.youtube.com/watch?v=cKdn_P-muO8",
            resources: [
              {
                title: "SOLID Principles",
                url: "https://en.wikipedia.org/wiki/SOLID",
              },
            ],
            order: 1,
          },
          {
            title: "Design Patterns",
            description:
              "Creational, structural, and behavioral design patterns.",
            videoUrl: "https://www.youtube.com/watch?v=cKdn_P-muO8",
            resources: [
              {
                title: "Design Patterns",
                url: "https://refactoring.guru/design-patterns",
              },
            ],
            order: 2,
          },
          {
            title: "Architectural Patterns",
            description:
              "MVC, MVVM, layered architecture, and hexagonal architecture.",
            videoUrl: "https://www.youtube.com/watch?v=cKdn_P-muO8",
            resources: [
              {
                title: "Architectural Patterns",
                url: "https://martinfowler.com/architecture/",
              },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "Scalability & Performance",
        description:
          "Horizontal/vertical scaling, caching, and performance optimization.",
        order: 2,
        topics: [
          {
            title: "Scalability Patterns",
            description:
              "Load balancing, database sharding, and horizontal scaling.",
            videoUrl: "https://www.youtube.com/watch?v=cKdn_P-muO8",
            resources: [
              {
                title: "Scalability Patterns",
                url: "https://microservices.io/patterns/",
              },
            ],
            order: 1,
          },
          {
            title: "Caching Strategies",
            description: "Cache-aside, write-through, and distributed caching.",
            videoUrl: "https://www.youtube.com/watch?v=cKdn_P-muO8",
            resources: [
              {
                title: "Caching Guide",
                url: "https://redis.io/topics/lru-cache",
              },
            ],
            order: 2,
          },
          {
            title: "Database Design",
            description:
              "Indexing, normalization, denormalization, and query optimization.",
            videoUrl: "https://www.youtube.com/watch?v=cKdn_P-muO8",
            resources: [
              {
                title: "Database Design",
                url: "https://www.lucidchart.com/pages/database-diagram/database-design",
              },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "Distributed Systems",
        description: "Distributed computing, consensus, and fault tolerance.",
        order: 3,
        topics: [
          {
            title: "Distributed Computing",
            description:
              "Message queues, event-driven architecture, and asynchronous processing.",
            videoUrl: "https://www.youtube.com/watch?v=cKdn_P-muO8",
            resources: [
              {
                title: "Distributed Systems",
                url: "https://www.distributed-systems.net/",
              },
            ],
            order: 1,
          },
          {
            title: "Consistency & Consensus",
            description:
              "CAP theorem, eventual consistency, and consensus algorithms.",
            videoUrl: "https://www.youtube.com/watch?v=cKdn_P-muO8",
            resources: [
              {
                title: "Consensus Algorithms",
                url: "https://en.wikipedia.org/wiki/Consensus_(computer_science)",
              },
            ],
            order: 2,
          },
          {
            title: "Fault Tolerance",
            description: "Circuit breakers, retries, and graceful degradation.",
            videoUrl: "https://www.youtube.com/watch?v=cKdn_P-muO8",
            resources: [
              {
                title: "Fault Tolerance",
                url: "https://martinfowler.com/bliki/CircuitBreaker.html",
              },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "System Design Case Studies",
        description: "Real-world system design problems and solutions.",
        order: 4,
        topics: [
          {
            title: "Designing a URL Shortener",
            description:
              "Requirements analysis, data modeling, and scalability considerations.",
            videoUrl: "https://www.youtube.com/watch?v=cKdn_P-muO8",
            resources: [
              {
                title: "System Design Primer",
                url: "https://github.com/donnemartin/system-design-primer",
              },
            ],
            order: 1,
          },
          {
            title: "Designing Instagram",
            description: "Photo storage, feed generation, and social features.",
            videoUrl: "https://www.youtube.com/watch?v=cKdn_P-muO8",
            resources: [
              {
                title: "Instagram Design",
                url: "https://github.com/donnemartin/system-design-primer#design-a-photo-sharing-system",
              },
            ],
            order: 2,
          },
          {
            title: "Designing Netflix",
            description: "Video streaming, CDN, and recommendation systems.",
            videoUrl: "https://www.youtube.com/watch?v=cKdn_P-muO8",
            resources: [
              {
                title: "Netflix Architecture",
                url: "https://netflixtechblog.com/",
              },
            ],
            order: 3,
          },
        ],
      },
    ],
  },
  // Cybersecurity
  {
    title: "Cybersecurity Fundamentals",
    description:
      "Learn cybersecurity principles, threats, and defensive techniques.",
    modules: [
      {
        title: "Security Basics",
        description: "Core security concepts, threats, and risk management.",
        order: 1,
        topics: [
          {
            title: "Information Security",
            description:
              "CIA triad, authentication, authorization, and access control.",
            videoUrl: "https://www.youtube.com/watch?v=inWWhr5tnEA",
            resources: [
              {
                title: "CIA Triad",
                url: "https://en.wikipedia.org/wiki/CIA_triad",
              },
            ],
            order: 1,
          },
          {
            title: "Common Threats",
            description:
              "Malware, phishing, social engineering, and attack vectors.",
            videoUrl: "https://www.youtube.com/watch?v=inWWhr5tnEA",
            resources: [
              {
                title: "OWASP Top 10",
                url: "https://owasp.org/www-project-top-ten/",
              },
            ],
            order: 2,
          },
          {
            title: "Cryptography Basics",
            description: "Encryption, hashing, digital signatures, and PKI.",
            videoUrl: "https://www.youtube.com/watch?v=inWWhr5tnEA",
            resources: [
              {
                title: "Cryptography",
                url: "https://en.wikipedia.org/wiki/Cryptography",
              },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "Network Security",
        description: "Network protocols, firewalls, and secure communication.",
        order: 2,
        topics: [
          {
            title: "Network Protocols",
            description: "TCP/IP, HTTP/HTTPS, SSL/TLS, and secure protocols.",
            videoUrl: "https://www.youtube.com/watch?v=inWWhr5tnEA",
            resources: [
              {
                title: "Network Security",
                url: "https://www.cloudflare.com/learning/security/",
              },
            ],
            order: 1,
          },
          {
            title: "Firewalls & IDS",
            description:
              "Firewall types, intrusion detection, and network monitoring.",
            videoUrl: "https://www.youtube.com/watch?v=inWWhr5tnEA",
            resources: [
              {
                title: "Firewall Guide",
                url: "https://www.cloudflare.com/learning/security/firewall/",
              },
            ],
            order: 2,
          },
          {
            title: "VPN & Secure Tunneling",
            description:
              "Virtual private networks, IPsec, and secure remote access.",
            videoUrl: "https://www.youtube.com/watch?v=inWWhr5tnEA",
            resources: [
              {
                title: "VPN Security",
                url: "https://www.cloudflare.com/learning/access-management/what-is-a-vpn/",
              },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "Web Application Security",
        description: "OWASP top 10, secure coding, and web security testing.",
        order: 3,
        topics: [
          {
            title: "OWASP Top 10",
            description: "Injection, XSS, CSRF, and other web vulnerabilities.",
            videoUrl: "https://www.youtube.com/watch?v=inWWhr5tnEA",
            resources: [
              {
                title: "OWASP Top 10",
                url: "https://owasp.org/www-project-top-ten/",
              },
            ],
            order: 1,
          },
          {
            title: "Secure Coding",
            description:
              "Input validation, output encoding, and secure development practices.",
            videoUrl: "https://www.youtube.com/watch?v=inWWhr5tnEA",
            resources: [
              {
                title: "Secure Coding",
                url: "https://owasp.org/www-pdf-archive/OWASP_SCP_Quick_Reference_Guide_v2.pdf",
              },
            ],
            order: 2,
          },
          {
            title: "Penetration Testing",
            description:
              "Ethical hacking, vulnerability assessment, and security testing.",
            videoUrl: "https://www.youtube.com/watch?v=inWWhr5tnEA",
            resources: [
              {
                title: "Penetration Testing",
                url: "https://owasp.org/www-community/OWASP_Testing_Guide_v4_Table_of_Contents",
              },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "Security Operations",
        description: "Incident response, forensics, and security monitoring.",
        order: 4,
        topics: [
          {
            title: "Incident Response",
            description:
              "Security incidents, response planning, and recovery procedures.",
            videoUrl: "https://www.youtube.com/watch?v=inWWhr5tnEA",
            resources: [
              {
                title: "NIST Incident Response",
                url: "https://csrc.nist.gov/publications/detail/sp/800-61/rev-2/final",
              },
            ],
            order: 1,
          },
          {
            title: "Digital Forensics",
            description: "Evidence collection, analysis, and forensic tools.",
            videoUrl: "https://www.youtube.com/watch?v=inWWhr5tnEA",
            resources: [
              {
                title: "Digital Forensics",
                url: "https://www.sans.org/cyber-security-skills-roadmap/digital-forensics/",
              },
            ],
            order: 2,
          },
          {
            title: "Security Monitoring",
            description: "SIEM systems, log analysis, and threat detection.",
            videoUrl: "https://www.youtube.com/watch?v=inWWhr5tnEA",
            resources: [
              {
                title: "SIEM Guide",
                url: "https://www.gartner.com/en/information-technology/glossary/security-information-and-event-management-siem",
              },
            ],
            order: 3,
          },
        ],
      },
    ],
  },
  // Game Development
  {
    title: "Game Development Fundamentals",
    description:
      "Learn game development with Unity, Unreal Engine, and game design principles.",
    modules: [
      {
        title: "Game Design Principles",
        description:
          "Game mechanics, player experience, and design fundamentals.",
        order: 1,
        topics: [
          {
            title: "Game Design Basics",
            description: "Core loops, player motivation, and game mechanics.",
            videoUrl: "https://www.youtube.com/watch?v=8FpigqfcvlM",
            resources: [
              {
                title: "Game Design",
                url: "https://www.gamedeveloper.com/design",
              },
            ],
            order: 1,
          },
          {
            title: "Unity Fundamentals",
            description: "Unity editor, scenes, GameObjects, and components.",
            videoUrl: "https://www.youtube.com/watch?v=8FpigqfcvlM",
            resources: [
              { title: "Unity Learn", url: "https://learn.unity.com/" },
            ],
            order: 2,
          },
          {
            title: "C# for Games",
            description:
              "Scripting in Unity with C# and game programming patterns.",
            videoUrl: "https://www.youtube.com/watch?v=8FpigqfcvlM",
            resources: [
              {
                title: "Unity Scripting",
                url: "https://docs.unity3d.com/ScriptReference/",
              },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "2D Game Development",
        description: "Sprites, animations, physics, and 2D game mechanics.",
        order: 2,
        topics: [
          {
            title: "2D Graphics & Sprites",
            description: "Sprite rendering, texture atlases, and 2D animation.",
            videoUrl: "https://www.youtube.com/watch?v=8FpigqfcvlM",
            resources: [
              {
                title: "Unity 2D",
                url: "https://learn.unity.com/course/create-with-code-unity-learn",
              },
            ],
            order: 1,
          },
          {
            title: "Physics & Collision",
            description:
              "2D physics, colliders, rigidbodies, and collision detection.",
            videoUrl: "https://www.youtube.com/watch?v=8FpigqfcvlM",
            resources: [
              {
                title: "Unity Physics",
                url: "https://docs.unity3d.com/Manual/Physics2D.html",
              },
            ],
            order: 2,
          },
          {
            title: "UI & HUD",
            description: "Canvas, UI components, and game interface design.",
            videoUrl: "https://www.youtube.com/watch?v=8FpigqfcvlM",
            resources: [
              {
                title: "Unity UI",
                url: "https://docs.unity3d.com/Manual/UISystem.html",
              },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "3D Game Development",
        description: "3D modeling, lighting, materials, and 3D game mechanics.",
        order: 3,
        topics: [
          {
            title: "3D Modeling & Assets",
            description: "3D models, textures, materials, and asset pipelines.",
            videoUrl: "https://www.youtube.com/watch?v=8FpigqfcvlM",
            resources: [{ title: "Blender", url: "https://www.blender.org/" }],
            order: 1,
          },
          {
            title: "Lighting & Rendering",
            description:
              "Lighting systems, shaders, and rendering optimization.",
            videoUrl: "https://www.youtube.com/watch?v=8FpigqfcvlM",
            resources: [
              {
                title: "Unity Lighting",
                url: "https://docs.unity3d.com/Manual/LightingOverview.html",
              },
            ],
            order: 2,
          },
          {
            title: "3D Physics",
            description:
              "Rigidbodies, joints, raycasting, and 3D physics simulation.",
            videoUrl: "https://www.youtube.com/watch?v=8FpigqfcvlM",
            resources: [
              {
                title: "Unity 3D Physics",
                url: "https://docs.unity3d.com/Manual/Physics.html",
              },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "Game Development Tools",
        description: "Version control, testing, optimization, and publishing.",
        order: 4,
        topics: [
          {
            title: "Version Control",
            description: "Git for game development and asset management.",
            videoUrl: "https://www.youtube.com/watch?v=8FpigqfcvlM",
            resources: [
              { title: "Git LFS", url: "https://git-lfs.github.io/" },
            ],
            order: 1,
          },
          {
            title: "Performance Optimization",
            description:
              "Profiling, optimization techniques, and performance testing.",
            videoUrl: "https://www.youtube.com/watch?v=8FpigqfcvlM",
            resources: [
              {
                title: "Unity Profiler",
                url: "https://docs.unity3d.com/Manual/Profiler.html",
              },
            ],
            order: 2,
          },
          {
            title: "Game Publishing",
            description: "Build settings, app stores, and game distribution.",
            videoUrl: "https://www.youtube.com/watch?v=8FpigqfcvlM",
            resources: [
              {
                title: "Unity Publishing",
                url: "https://unity.com/solutions/publish",
              },
            ],
            order: 3,
          },
        ],
      },
    ],
  },
  // Blockchain
  {
    title: "Blockchain Development",
    description:
      "Learn blockchain technology, smart contracts, and decentralized applications.",
    modules: [
      {
        title: "Blockchain Fundamentals",
        description:
          "Cryptography, distributed systems, and blockchain concepts.",
        order: 1,
        topics: [
          {
            title: "Blockchain Basics",
            description:
              "Distributed ledgers, consensus mechanisms, and decentralization.",
            videoUrl: "https://www.youtube.com/watch?v=SSo_EIwHSd4",
            resources: [
              { title: "Blockchain Guide", url: "https://blockchain.info/" },
            ],
            order: 1,
          },
          {
            title: "Cryptography in Blockchain",
            description:
              "Hash functions, digital signatures, and public-key cryptography.",
            videoUrl: "https://www.youtube.com/watch?v=SSo_EIwHSd4",
            resources: [
              {
                title: "Cryptography",
                url: "https://en.wikipedia.org/wiki/Cryptography",
              },
            ],
            order: 2,
          },
          {
            title: "Bitcoin & Cryptocurrencies",
            description:
              "Bitcoin protocol, mining, and cryptocurrency fundamentals.",
            videoUrl: "https://www.youtube.com/watch?v=SSo_EIwHSd4",
            resources: [
              {
                title: "Bitcoin Whitepaper",
                url: "https://bitcoin.org/bitcoin.pdf",
              },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "Ethereum & Smart Contracts",
        description: "Ethereum network, smart contracts, and dApp development.",
        order: 2,
        topics: [
          {
            title: "Ethereum Fundamentals",
            description: "Ethereum Virtual Machine, gas, and account types.",
            videoUrl: "https://www.youtube.com/watch?v=SSo_EIwHSd4",
            resources: [
              {
                title: "Ethereum Docs",
                url: "https://ethereum.org/en/developers/docs/",
              },
            ],
            order: 1,
          },
          {
            title: "Solidity Programming",
            description:
              "Smart contract language, syntax, and development tools.",
            videoUrl: "https://www.youtube.com/watch?v=SSo_EIwHSd4",
            resources: [
              { title: "Solidity Docs", url: "https://docs.soliditylang.org/" },
            ],
            order: 2,
          },
          {
            title: "Smart Contract Development",
            description: "Writing, testing, and deploying smart contracts.",
            videoUrl: "https://www.youtube.com/watch?v=SSo_EIwHSd4",
            resources: [{ title: "Hardhat", url: "https://hardhat.org/" }],
            order: 3,
          },
        ],
      },
      {
        title: "Decentralized Applications",
        description: "Web3, DeFi, NFTs, and dApp architecture.",
        order: 3,
        topics: [
          {
            title: "Web3 Development",
            description: "Web3.js, ethers.js, and blockchain interaction.",
            videoUrl: "https://www.youtube.com/watch?v=SSo_EIwHSd4",
            resources: [
              { title: "Web3.js", url: "https://web3js.readthedocs.io/" },
            ],
            order: 1,
          },
          {
            title: "DeFi Protocols",
            description: "Decentralized finance, AMMs, and yield farming.",
            videoUrl: "https://www.youtube.com/watch?v=SSo_EIwHSd4",
            resources: [{ title: "DeFi Guide", url: "https://defi.org/" }],
            order: 2,
          },
          {
            title: "NFT Development",
            description: "ERC-721, ERC-1155, and NFT marketplace development.",
            videoUrl: "https://www.youtube.com/watch?v=SSo_EIwHSd4",
            resources: [
              { title: "OpenSea Docs", url: "https://docs.opensea.io/" },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "Advanced Blockchain Topics",
        description:
          "Layer 2 solutions, interoperability, and blockchain security.",
        order: 4,
        topics: [
          {
            title: "Layer 2 Solutions",
            description: "Rollups, sidechains, and scaling solutions.",
            videoUrl: "https://www.youtube.com/watch?v=SSo_EIwHSd4",
            resources: [
              {
                title: "Layer 2",
                url: "https://ethereum.org/en/developers/docs/scaling/layer-2-rollups/",
              },
            ],
            order: 1,
          },
          {
            title: "Blockchain Security",
            description: "Smart contract security, audits, and best practices.",
            videoUrl: "https://www.youtube.com/watch?v=SSo_EIwHSd4",
            resources: [
              {
                title: "Smart Contract Security",
                url: "https://consensys.github.io/smart-contract-best-practices/",
              },
            ],
            order: 2,
          },
          {
            title: "Cross-Chain Development",
            description:
              "Interoperability, bridges, and multi-chain applications.",
            videoUrl: "https://www.youtube.com/watch?v=SSo_EIwHSd4",
            resources: [{ title: "Chainlink", url: "https://chain.link/" }],
            order: 3,
          },
        ],
      },
    ],
  },
  // AI/ML Engineering
  {
    title: "AI/ML Engineering",
    description: "Build production-ready AI and machine learning systems.",
    modules: [
      {
        title: "AI/ML Fundamentals",
        description:
          "Core AI concepts, algorithms, and machine learning theory.",
        order: 1,
        topics: [
          {
            title: "AI & ML Concepts",
            description:
              "Artificial intelligence, machine learning, and deep learning.",
            videoUrl: "https://www.youtube.com/watch?v=4b4MUYve_U8",
            resources: [
              {
                title: "AI For Everyone",
                url: "https://www.coursera.org/learn/ai-for-everyone",
              },
            ],
            order: 1,
          },
          {
            title: "Supervised Learning",
            description: "Regression, classification, and model training.",
            videoUrl: "https://www.youtube.com/watch?v=4b4MUYve_U8",
            resources: [
              {
                title: "Machine Learning",
                url: "https://www.coursera.org/learn/machine-learning",
              },
            ],
            order: 2,
          },
          {
            title: "Deep Learning",
            description: "Neural networks, CNNs, RNNs, and transformers.",
            videoUrl: "https://www.youtube.com/watch?v=aircAruvnKk",
            resources: [
              {
                title: "Deep Learning Specialization",
                url: "https://www.coursera.org/specializations/deep-learning",
              },
            ],
            order: 3,
          },
        ],
      },
      {
        title: "ML Engineering Practices",
        description: "Model development, evaluation, and deployment pipelines.",
        order: 2,
        topics: [
          {
            title: "Model Development",
            description:
              "Feature engineering, model selection, and hyperparameter tuning.",
            videoUrl: "https://www.youtube.com/watch?v=4b4MUYve_U8",
            resources: [
              { title: "Scikit-learn", url: "https://scikit-learn.org/" },
            ],
            order: 1,
          },
          {
            title: "Model Evaluation",
            description:
              "Metrics, validation, cross-validation, and bias-variance tradeoff.",
            videoUrl: "https://www.youtube.com/watch?v=4b4MUYve_U8",
            resources: [
              {
                title: "Model Evaluation",
                url: "https://scikit-learn.org/stable/modules/model_evaluation.html",
              },
            ],
            order: 2,
          },
          {
            title: "ML Pipelines",
            description: "Data pipelines, model pipelines, and automation.",
            videoUrl: "https://www.youtube.com/watch?v=4b4MUYve_U8",
            resources: [{ title: "MLflow", url: "https://mlflow.org/" }],
            order: 3,
          },
        ],
      },
      {
        title: "Production ML Systems",
        description:
          "Model serving, monitoring, and scalable ML infrastructure.",
        order: 3,
        topics: [
          {
            title: "Model Deployment",
            description: "REST APIs, containerization, and cloud deployment.",
            videoUrl: "https://www.youtube.com/watch?v=4b4MUYve_U8",
            resources: [
              {
                title: "TensorFlow Serving",
                url: "https://www.tensorflow.org/tfx/guide/serving",
              },
            ],
            order: 1,
          },
          {
            title: "MLOps",
            description:
              "Model versioning, monitoring, and continuous deployment.",
            videoUrl: "https://www.youtube.com/watch?v=4b4MUYve_U8",
            resources: [{ title: "MLOps Guide", url: "https://ml-ops.org/" }],
            order: 2,
          },
          {
            title: "Scalable ML",
            description:
              "Distributed training, model optimization, and inference.",
            videoUrl: "https://www.youtube.com/watch?v=4b4MUYve_U8",
            resources: [{ title: "Ray", url: "https://www.ray.io/" }],
            order: 3,
          },
        ],
      },
      {
        title: "Specialized AI Applications",
        description: "Computer vision, NLP, and recommendation systems.",
        order: 4,
        topics: [
          {
            title: "Computer Vision",
            description:
              "Image classification, object detection, and segmentation.",
            videoUrl: "https://www.youtube.com/watch?v=oXlwWbU8l2o",
            resources: [{ title: "OpenCV", url: "https://opencv.org/" }],
            order: 1,
          },
          {
            title: "Natural Language Processing",
            description:
              "Text processing, sentiment analysis, and language models.",
            videoUrl: "https://www.youtube.com/watch?v=8S2xBy4oHkc",
            resources: [
              { title: "Hugging Face", url: "https://huggingface.co/" },
            ],
            order: 2,
          },
          {
            title: "Recommendation Systems",
            description:
              "Collaborative filtering, content-based, and hybrid approaches.",
            videoUrl: "https://www.youtube.com/watch?v=4b4MUYve_U8",
            resources: [
              {
                title: "Recommender Systems",
                url: "https://developers.google.com/machine-learning/recommendation",
              },
            ],
            order: 3,
          },
        ],
      },
    ],
  },
];

export const roadmapService = {
  clearRoadmapData: async () => {
    const modules = await Module.find().select("_id").lean();
    const moduleIds = modules.map((module) => module._id);

    await Progress.deleteMany({});
    await Topic.deleteMany({
      ...(moduleIds.length ? { module: { $in: moduleIds } } : {}),
    });
    await Module.deleteMany({});
    await Roadmap.deleteMany({});
  },

  seedSampleRoadmaps: async () => {
    const count = await Roadmap.countDocuments();
    if (count > 0) {
      return;
    }

    for (const roadmapData of sampleRoadmaps) {
      const roadmap = new Roadmap({
        title: roadmapData.title,
        description: roadmapData.description,
      });
      await roadmap.save();

      const moduleIds = [];
      for (const moduleData of roadmapData.modules) {
        const module = new Module({
          title: moduleData.title,
          description: moduleData.description,
          order: moduleData.order,
          roadmap: roadmap._id,
        });
        await module.save();

        const topicIds = [];
        for (const topicData of moduleData.topics) {
          const topic = new Topic({
            title: topicData.title,
            description: topicData.description,
            videoUrl: topicData.videoUrl,
            resources: topicData.resources,
            module: module._id,
            order: topicData.order,
          });
          await topic.save();
          topicIds.push(topic._id);
        }

        module.topics = topicIds;
        await module.save();
        moduleIds.push(module._id);
      }

      roadmap.modules = moduleIds;
      await roadmap.save();
    }
  },

  resetAndSeedSampleRoadmaps: async () => {
    await roadmapService.clearRoadmapData();
    await roadmapService.seedSampleRoadmaps();
  },

  getAllRoadmaps: async () => {
    await roadmapService.seedSampleRoadmaps();
    return Roadmap.find().select("title description").lean();
  },

  getRoadmapById: async (roadmapId) => {
    const roadmap = await Roadmap.findById(roadmapId)
      .populate({
        path: "modules",
        options: { sort: { order: 1 } },
        populate: {
          path: "topics",
          options: { sort: { order: 1 } },
        },
      })
      .lean();

    if (!roadmap) {
      throw new Error("Roadmap not found");
    }

    return roadmap;
  },

  getModulesByRoadmap: async (roadmapId) => {
    const modules = await Module.find({ roadmap: roadmapId })
      .sort({ order: 1 })
      .lean();

    return modules;
  },

  getTopicsByModule: async (moduleId) => {
    const topics = await Topic.find({ module: moduleId })
      .sort({ order: 1 })
      .lean();

    return topics;
  },

  createRoadmap: async ({ title, description }) => {
    if (!title || !description) {
      throw new Error("Roadmap title and description are required");
    }
    const roadmap = new Roadmap({ title, description });
    return roadmap.save();
  },

  updateRoadmap: async (roadmapId, updates) => {
    const roadmap = await Roadmap.findByIdAndUpdate(roadmapId, updates, {
      new: true,
      runValidators: true,
    }).lean();

    if (!roadmap) {
      throw new Error("Roadmap not found");
    }

    return roadmap;
  },

  deleteRoadmap: async (roadmapId) => {
    const roadmap = await Roadmap.findById(roadmapId);
    if (!roadmap) {
      throw new Error("Roadmap not found");
    }

    const modules = await Module.find({ roadmap: roadmap._id });
    const moduleIds = modules.map((module) => module._id);

    await Topic.deleteMany({ module: { $in: moduleIds } });
    await Module.deleteMany({ roadmap: roadmap._id });
    await Roadmap.deleteOne({ _id: roadmap._id });

    return roadmap;
  },

  createModule: async (roadmapId, { title, description, order = 0 }) => {
    const roadmap = await Roadmap.findById(roadmapId);
    if (!roadmap) {
      throw new Error("Roadmap not found");
    }

    const module = new Module({
      title,
      description,
      order,
      roadmap: roadmap._id,
    });
    await module.save();

    roadmap.modules.push(module._id);
    await roadmap.save();

    return module;
  },

  updateModule: async (moduleId, updates) => {
    const module = await Module.findByIdAndUpdate(moduleId, updates, {
      new: true,
      runValidators: true,
    }).lean();

    if (!module) {
      throw new Error("Module not found");
    }

    return module;
  },

  deleteModule: async (moduleId) => {
    const module = await Module.findById(moduleId);
    if (!module) {
      throw new Error("Module not found");
    }

    await Topic.deleteMany({ module: module._id });
    await Roadmap.findByIdAndUpdate(module.roadmap, {
      $pull: { modules: module._id },
    });
    await Module.deleteOne({ _id: module._id });

    return module;
  },

  createTopic: async (
    moduleId,
    { title, description, videoUrl = "", resources = [], order = 0 },
  ) => {
    const module = await Module.findById(moduleId);
    if (!module) {
      throw new Error("Module not found");
    }

    const topic = new Topic({
      title,
      description,
      videoUrl,
      resources,
      module: module._id,
      order,
    });
    await topic.save();

    module.topics.push(topic._id);
    await module.save();

    return topic;
  },

  updateTopic: async (topicId, updates) => {
    const topic = await Topic.findByIdAndUpdate(topicId, updates, {
      new: true,
      runValidators: true,
    }).lean();

    if (!topic) {
      throw new Error("Topic not found");
    }

    return topic;
  },

  deleteTopic: async (topicId) => {
    const topic = await Topic.findById(topicId);
    if (!topic) {
      throw new Error("Topic not found");
    }

    await Module.findByIdAndUpdate(topic.module, {
      $pull: { topics: topic._id },
    });
    await Topic.deleteOne({ _id: topic._id });

    return topic;
  },
};
