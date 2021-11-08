import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "./ModalTerms.css";
const ModelTerms = (props) => {
  return (
    <Modal className="modal-terms-body" show={props.onenable}>
      <Modal.Header className="p-0">
        <div className="w-100 pb-3 row m-0">
          <span className="h3 m-0  w-auto">Guide To Kegel Exercises</span>
          <span className="ml-auto w-auto round-bottons round-bottons-border bg-white round-bottons-sm">
            <i
              className="fas fa-times fa-sm"
              onClick={() => props.setAboutApp(false)}
            ></i>
          </span>
        </div>
      </Modal.Header>
      <Modal.Body className="p-0">
        <div className="w-100  rounded-xl tooltipBox">
          <div className="w-100 tooltipContentMobile ">
            <p>
              Kegel Exercises (also known as pelvic floor exercises) are
              designed to strengthen your pelvic floor muscles. The pelvic floor
              muscles are responsible for supporting the uterus, bladder, bowl,
              and rectum. Strengthening these muscles has positive impact for
              both men and women. It can help with:
            </p>
            <ul>
              <li>
                Leaking or Dribbling Urine during normal activities (Urine
                Incontinence).
              </li>
              <li>Prevent leaking urine after childbirth.</li>
              <li>Increase sensitivity during sex and stronger orgasms.</li>
              <li>Potential to help with Erectile dysfunction.</li>
            </ul>
            <h5>How to do Kegel exercises</h5>
            <p>To get started:</p>
            <ul>
              <li>
                <span className="gilroyHeavy">Find the right muscles.</span> To
                identify your pelvic floor muscles, stop urination in midstream.
                Once you've identified your pelvic floor muscles you can do the
                exercises in any position, although you might find it easiest to
                do them lying down at first.
              </li>
              <li>
                <span className="gilroyHeavy">Perfect your technique.</span> To
                do Kegels, imagine you are sitting on a marble and tighten your
                pelvic muscles as if you're lifting the marble. Try it for three
                seconds at a time, then relax for a count of three.
              </li>
              <li>
                <span className="gilroyHeavy">Maintain your focus.</span>
                For best results, focus on tightening only your pelvic floor
                muscles. Be careful not to flex the muscles in your abdomen,
                thighs or buttocks. Avoid holding your breath. Instead, breathe
                freely during the exercises.
              </li>
              <li>
                <span className="gilroyHeavy">Repeat three times a day.</span>
                Aim for at least three sets of 10 to 15 repetitions a day (both
                fast and slow).
              </li>
            </ul>
            <h5>How to Use Bloomia?</h5>
            <p>
              Bloomia is designed to be easy to use. Kegel exercises typically
              follow a process like:
            </p>
            <ul>
              <li>Squeeze your pelvic floor muscles for X seconds</li>

              <li>Rest for X seconds</li>
              <li>Repeat Y number of times</li>
            </ul>
            <p>
              With Bloomia, we follow the same process but we make sure the
              exercises contain long squeezes and short squeezes which should
              help you.
            </p>
            <h5>How to Select a Workout?</h5>
            <p>
              Bloomia recommends starting with the beginner workout and
              increasing the repetitions and length as you strengthen your
              pelvic floor. The most important thing is consistency. Focus on
              completing your Kegels each day and keeping track of your
              progress!
            </p>
            <h5>Something is not working as expected</h5>
            <p>Let us know about it by emailing admin@bloomia.com</p>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModelTerms;
