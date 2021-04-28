import React from "react";
import Icon from "@mdi/react";
import {mdiPinOff} from "@mdi/js";

const Overview = () => {
  return (
    <div>
      <div className="bg-light ">
        <div className="mx-4 ">
          <h2 className="font-weight-bold pt-5">About the Project</h2>
          <h5 className="font-weight-bold my-4">Description</h5>
          <p>
            Culpa do mollit veniam est elit minim ut ipsum commodo consequat
            labore eu duis. Consequat ullamco eiusmod pariatur aliquip nostrud
            occaecat ut. Cupidatat nisi nulla aliquip amet dolore commodo
            laboris ex. Ad eu et aliqua occaecat proident occaecat ut quis.
            Minim reprehenderit anim proident exercitation eiusmod sint aliquip
            cupidatat est cillum amet dolore. Aute eu anim ea sint amet minim
            dolore. In eiusmod do est labore fugiat amet eiusmod consequat aute
            non.
          </p>
          <h5 className="font-weight-bold my-4">Impacts</h5>
          <p>
            Culpa do mollit veniam est elit minim ut ipsum commodo consequat
            labore eu duis. Consequat ullamco eiusmod pariatur aliquip nostrud
            occaecat ut. Cupidatat nisi nulla aliquip amet dolore commodo
            laboris ex. Ad eu et aliqua occaecat proident occaecat ut quis.
            Minim reprehenderit anim proident exercitation eiusmod sint aliquip
            cupidatat est cillum amet dolore. Aute eu anim ea sint amet minim
            dolore. In eiusmod do est labore fugiat amet eiusmod consequat aute
            non.
          </p>
          <h5 className="font-weight-bold my-4">Desired Outcomes</h5>
          <p>
            Culpa do mollit veniam est elit minim ut ipsum commodo consequat
            labore eu duis. Consequat ullamco eiusmod pariatur aliquip nostrud
            occaecat ut. Cupidatat nisi nulla aliquip amet dolore commodo
            laboris ex. Ad eu et aliqua occaecat proident occaecat ut quis.
            Minim reprehenderit anim proident exercitation eiusmod sint aliquip
            cupidatat est cillum amet dolore. Aute eu anim ea sint amet minim
            dolore. In eiusmod do est labore fugiat amet eiusmod consequat aute
            non.
          </p>
        </div>
        <div className="px-5 bg-white">
          <h4 className="font-weight-bold">Location</h4>
          <img src="https://www.vitruvianpartners.com/wp-content/uploads/placeholder-banner.png" className="w-100 my-4"/>
          <Icon path={mdiPinOff} size={1} className="p-1" />
          <span className="pl-1 font-weight-bold">Et cillum id nisi duis mollit do.</span>
          <p className="mt-4 pl-4 " >Pariatur enim do ullamco nisi ad excepteur mollit id aliquip irure elit ipsum. Culpa amet sit amet tempor anim do occaecat in excepteur. Duis minim consequat fugiat sit nisi in fugiat occaecat proident reprehenderit. Enim ad amet quis anim..</p>
        </div>
      </div>
    </div>
  );
};

export default Overview;
