import React from "react";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function about() {
  return (
    <div>
      <Navbar />
      <div className="bg-neutral-800 text-white border-white-100 border-b-2 p-10">
        <h1 className="text-4xl pb-10">About us</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus
          efficitur augue vitae scelerisque scelerisque. Ut consequat venenatis
          enim, ac accumsan orci scelerisque eget. Sed sed turpis purus. Cras
          semper fringilla lectus vel volutpat. Nulla commodo est urna, vel
          dictum erat hendrerit sed. Etiam non pharetra tellus. Integer aliquet
          mi condimentum, blandit purus id, mattis leo. Proin elementum mauris
          nulla, ac tristique nunc lacinia non.
        </p>
        <br />
        <p>
          Sed dui sem, pulvinar in nisi eget, consectetur gravida libero.
          Integer a quam eu dui sodales viverra quis nec erat. Curabitur eget
          elit vitae est mattis convallis eget a odio. Nullam nisi nisl,
          venenatis sit amet pulvinar commodo, maximus a lectus. Quisque
          accumsan arcu non vehicula pretium. Nulla volutpat rhoncus nisi eget
          euismod. Sed fermentum erat at cursus blandit. In tincidunt lacus sit
          amet sem finibus tincidunt. Maecenas in auctor eros.
        </p>
        <br />
        <p>
          Integer ac dolor ex. Sed eu dignissim nisi. Mauris sed lacinia sapien,
          sit amet scelerisque erat. Cras aliquam accumsan pulvinar. Suspendisse
          consequat non urna in commodo. Mauris at dui posuere, malesuada turpis
          a, volutpat ex. In hac habitasse platea dictumst. Fusce nibh est,
          porta sed ante ac, porta elementum leo.
        </p>
        <br />
        <p>
          In condimentum magna et dui pulvinar pretium. Fusce feugiat, mi et
          ornare venenatis, nisi mi suscipit urna, ac fermentum tellus lorem
          varius ex. In hac habitasse platea dictumst. Etiam imperdiet, libero
          at rutrum feugiat, quam lectus ultricies erat, ut pellentesque sem est
          eget metus. Pellentesque velit velit, fringilla vitae tortor in,
          facilisis dapibus est. Suspendisse vel orci sem. Proin vel enim sit
          amet mauris porttitor ultrices ac a tellus. Mauris in libero urna. Sed
          ac dictum libero.
        </p>
      </div>
      <Footer />
    </div>
  );
}
