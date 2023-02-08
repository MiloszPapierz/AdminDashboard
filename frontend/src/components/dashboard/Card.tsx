import { memo } from "react";
import { IconType } from "react-icons";

interface props {
  Icon: IconType;
  headerText: string;
  bodyText: string | number;
}

const Card = memo(({ Icon, headerText, bodyText }: props): JSX.Element => {
  return (
    <>
      <div
        className="bg-light-grey py-8 rounded-md flex justify-between items-center px-4"
        data-cy="dashboard_card"
      >
        <div>
          <Icon className="w-11 h-11 text-sky-blue" />
        </div>
        <div className="w-full text-right">
          <h5 className="text-sonic-silver font-bold">{headerText}</h5>
          <p className="text-dark-green font-bold" data-cy="card_body">
            {bodyText}
          </p>
        </div>
      </div>
    </>
  );
});

export default Card;
