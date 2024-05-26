import { api } from "../api";
import { useFindMany, useActionForm } from "@gadgetinc/react";

export default function () {
  // the useActionForm hook is used to call the gadgemon.create action
  // and manages form state and submission
  const { submit, register, formState, error, reset } = useActionForm(api.gadgemon.create, {
    defaultValues: {
      name: "",
      similar: "",
      element: "",
    },
    onSuccess: () => {
      // reset the form once submission is complete
      reset();
    },
  });

  // the useFindMany hook is used to read records from the Gadgemon model
  const [{ data: myGadgemon, fetching: fetchingGadgemon }] = useFindMany(api.gadgemon);

  return (
    <>
      {error && (
        <p className="format-message error">
          <code>{error.message}</code>
        </p>
      )}
      <div
        style={{
          width: "80vw",
          height: "80vh",
          overflowY: "auto",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "32px",
          backgroundColor: "white",
          padding: "32px",
          boxShadow: "0 4px 4px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <section style={{ width: "250px" }}>
          <h2>Gadgémon factory</h2>
          <form onSubmit={submit} className="custom-form" style={{ marginTop: "24px", alignItems: "center" }}>
            <input
              className="custom-input"
              type="text"
              placeholder="Name"
              disabled={formState.isSubmitting}
              {...register("gadgemon.name")}
            />
            <input
              className="custom-input"
              type="text"
              placeholder="Looks similar to a ..."
              disabled={formState.isSubmitting}
              {...register("gadgemon.similar")}
            />
            <select className="custom-input" disabled={formState.isSubmitting} {...register("gadgemon.element")}>
              <option value="grass">Grass</option>
              <option value="water">Water</option>
              <option value="fire">Fire</option>
            </select>
            <button type="submit" disabled={formState.isSubmitting}>
              Create Gadgémon
            </button>
            {formState.isSubmitting && <p>Creating Gadgémon...</p>}
          </form>
        </section>
        <section style={{ flexGrow: 1, maxWidth: "75%", margin: "0 auto" }}>
          <h2>Gadgémon gallery</h2>
          {fetchingGadgemon && <p className="format-message">Fetching Gadgémon...</p>}
          {/** iterate over gadgemon returned from useFindMany hook */}
          {!myGadgemon || myGadgemon.length == 0 ? (
            <p className="format-message">Start by creating a Gadgémon!</p>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                flexWrap: "wrap",
                width: "100%",
                marginTop: "16px",
                justifyContent: "center",
              }}
            >
              {myGadgemon?.map((gadgemon, i) => (
                <div
                  key={`gadgemon_${i}`}
                  style={{
                    width: "256px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "4px",
                    border: "1px solid lightgrey",
                    margin: "8px",
                  }}
                >
                  <b>{gadgemon.name}</b>
                  <img src={gadgemon.sprite?.url} />
                  <p style={{ maxWidth: "80%" }}>
                    the "{gadgemon.element} {gadgemon.similar}" Gadgémon
                  </p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
}